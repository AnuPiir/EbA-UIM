// frontend/src/app/questionnaire/questionnaire.component.ts

import {Component, OnInit} from '@angular/core';
import {QuestionnaireService} from './service/questionnaire.service';
import {Questionnaire} from './model/questionnaire';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {DeleteModalComponent} from './modal/delete-modal/delete-modal.component';
import {EditModalComponent} from './modal/edit-modal/edit-modal.component';
import {formatDate} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {formatFullDate, formatTimeAgo} from "../utils/date.utils";
import {firstValueFrom} from "rxjs";
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

    loading: boolean = true;
    isToggled: boolean = false;
    isOpen: boolean = false
    questionnaires: Questionnaire[] = [];
    questionnaireName: string = '';
    currentlyEditingQuestionnaires: any[] = [];
    TIMEOUT_BEFORE_RETRYING = 5000;
    validationPath = "/validation"

    modalRef: BsModalRef;
    menuIcon: string = "more_vert";

    sortField: 'name' | 'lastModified' = 'lastModified';
    sortDirection: 'asc' | 'desc' = 'desc';

    notificationVisible = false;
    notificationMessage = '';

    constructor(
        private questionnaireService: QuestionnaireService,
        private modalService: BsModalService,
        private translateService: TranslateService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.getQuestionnaires();
    }

    async getQuestionnaires() {
        this.loading = true;
        this.questionnaires = await firstValueFrom(this.questionnaireService.getQuestionnaires())
        console.log(this.questionnaires)
        this.sortQuestionnaires();
        this.loading = false;
        this.cdr.detectChanges();
    }

    async addNewQuestionnaire(questionnaireName: string) {
        if (!questionnaireName || questionnaireName.trim() === '') {
            return;
        }

        this.loading = true;
        let newQuestionnaire = await firstValueFrom(this.questionnaireService.saveQuestionnaire({id: null, name: questionnaireName}));

        if (newQuestionnaire) {

            this.questionnaireName = '';
            this.isToggled = false;

            await this.router.navigate(['/validation'], {
                queryParams: {
                    questionnaireId: newQuestionnaire.id
                }
            }).finally(() => this.loading = false);
        }

    }

    toggleAddNewQuestionnaire(): void {
        this.isToggled = !this.isToggled;
    }

    openActionButtonsMenu(): void {
        this.isOpen = !this.isOpen;
    }

    deleteQuestionnaire(questionnaire: Questionnaire) {
        const initialState = {
            isProject: true,
            questionnaireName: questionnaire.name
        };
        this.modalRef = this.modalService.show(DeleteModalComponent, {
            class: 'modal-box modal-md', initialState
        });
        this.modalRef.content.onClose.subscribe((result: any) => {
            if (result.deleteObject) {
                this.loading = true;
                this.questionnaireService.deleteQuestionnaire(questionnaire.id).subscribe(next => {
                        this.questionnaires = this.questionnaires.filter(q => q.id !== questionnaire.id);
                        this.loading = false;

                    }, () => this.loading = false
                )
            }
        });
    }

    editQuestionnaire(questionnaire: Questionnaire) {
        const initialState = {
            name: questionnaire.name,
            titleTranslationKey: 'editProjectModal.title',
            inputTranslationKey: 'editProjectModal.input',
        };
        this.modalRef = this.modalService.show(EditModalComponent, {
            class: 'modal-box modal-md', initialState
        });
        this.modalRef.content.onClose.subscribe((result: any) => {
            if (result?.edit) {
                this.loading = true;
                this.questionnaireService.saveQuestionnaire({
                    id: questionnaire.id,
                    name: result.newValue
                }).subscribe(next => {
                        const questionnaireToEdit = this.questionnaires.find(q => q.id === questionnaire.id);
                        if (questionnaireToEdit) {
                            questionnaireToEdit.name = result.newValue;
                        }
                        this.loading = false;

                    }, () => this.loading = false
                )
            }
        });
    }

    downloadQuestionnaireAsExcel(questionnaire: Questionnaire) {
        this.questionnaireService.exportQuestionnaireAsExcel(questionnaire.id, this.translateService.currentLang).subscribe((data) => {
            const downloadURL = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = questionnaire.name + "_" + formatDate(new Date(), 'yyyy-MM-dd', 'en-US') + ".xlsx";
            link.click();
            window.URL.revokeObjectURL(downloadURL);
        });
    }

    downloadQuestionnaireAsJson(questionnaire: Questionnaire) {
        this.questionnaireService.exportQuestionnaireAsJson(questionnaire.id).subscribe((data) => {
            const downloadURL = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = `${questionnaire.name}_${formatDate(new Date(), 'yyyy-MM-dd', 'en-US')}.json`;
            link.click();
            window.URL.revokeObjectURL(downloadURL);
        });
    }

    getActions(questionnaire: Questionnaire): { name: string, icon: string, onClick: () => void }[] {
        return [
            {name: "menu.edit", icon: 'edit', onClick: () => this.editQuestionnaire(questionnaire)},
            {name: "menu.delete", icon: 'delete', onClick: () => this.deleteQuestionnaire(questionnaire)},
            {
                name: "menu.downloadExcel",
                icon: 'download',
                onClick: () => this.downloadQuestionnaireAsExcel(questionnaire)
            },
            {
                name: "menu.downloadJson",
                icon: 'download',
                onClick: () => this.downloadQuestionnaireAsJson(questionnaire)
            },
        ];
    }

    importProject() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = (event: any) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target?.result as string);
                    console.log(jsonData);
                    this.questionnaireService.importQuestionnaireFromJson(jsonData).subscribe(
                        response => {
                            if (response) {
                                this.router.navigate(['/validation'], {
                                    queryParams: {
                                        questionnaireId: response.id
                                    }
                                });
                            }
                        }
                    );
                } catch (error) {
                    console.log('error importing projectImportFailed', error);
                }
            };

            reader.readAsText(file);
        };

        input.click();
    }

    sortQuestionnaires(): void {
        this.questionnaires.sort((a, b) => {
            if (this.sortField === 'name') {
                return this.sortDirection === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else {
                return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
            }
        });
    }

    // Toggle sort field and direction
    toggleSort(field: 'name' | 'lastModified'): void {
        console.log(`Toggling sort to ${field}`);

        if (this.sortField === field) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = field;
            this.sortDirection = 'desc'; // Default to descending when changing fields
        }

        this.sortQuestionnaires();
    }

    // Get sort indicator icon
    getSortIcon(field: 'name' | 'lastModified'): string {
        if (this.sortField !== field) return 'unfold_more';
        return this.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
    }

    // Get formatted date for display
    getFormattedDate(lastModified: string | null): string {
        if (!lastModified) return this.translateService.instant('projectsTable.noDate');
        return formatTimeAgo(lastModified);
    }


    protected readonly formatFullDate = formatFullDate;
    protected readonly formatTimeAgo = formatTimeAgo;
}