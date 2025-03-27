// frontend/src/app/questionnaire/questionnaire.component.ts

import {Component, OnInit} from '@angular/core';
import {QuestionnaireService} from './service/questionnaire.service';
import {QuestionnaireResponse} from './model/questionnaire-response';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {DeleteModalComponent} from './modal/delete-modal/delete-modal.component';
import {EditModalComponent} from './modal/edit-modal/edit-modal.component';
import {formatDate} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {formatFullDate, formatTimeAgo, getIdBasedTimestamp} from "../utils/date.utils";
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

    loading: boolean = true;
    isToggled: boolean = false;
    isOpen: boolean = false
    questionnaires: QuestionnaireResponse[] = [];
    questionnaireName: string = '';
    currentlyEditingQuestionnaires: any[] = [];
    TIMEOUT_BEFORE_RETRYING = 5000;
    validationPath = "/validation"
    // @ts-ignore
    modalRef: BsModalRef;
    menuIcon: string = "more_vert";

    // Sorting properties
    sortField: 'name' | 'lastModified' = 'lastModified'; // Default to last modified
    sortDirection: 'asc' | 'desc' = 'desc'; // Default to newest first

    constructor(
        private questionnaireService: QuestionnaireService,
        private modalService: BsModalService,
        private translateService: TranslateService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.getQuestionnaires();
    }

    getQuestionnaires(): void {
        this.loading = true;
        this.questionnaireService.getQuestionnaires().subscribe(
            next => {
                console.log('Raw questionnaires from backend:', next);
                this.questionnaires = next;
                this.normalizeDates();
                this.sortQuestionnaires();
                this.loading = false;
            },
            error => {
                console.error('Error fetching questionnaires:', error);
                setTimeout(() => {
                    this.questionnaireService.getQuestionnaires().subscribe(
                        next => {
                            this.questionnaires = next;
                            this.normalizeDates();
                            this.sortQuestionnaires();
                            this.loading = false;
                        },
                        () => this.loading = false
                    );
                }, this.TIMEOUT_BEFORE_RETRYING);
            }
        );
    }

    async addNewQuestionnaire(questionnaireName: string) {
        if (!questionnaireName || questionnaireName.trim() === '') {
            return;
        }

        try {
            this.loading = true;
            console.log('Creating new questionnaire:', questionnaireName);

            // Step 1: Get list of projects before creation
            const beforeList = await firstValueFrom(this.questionnaireService.getQuestionnaires());
            const beforeIds = new Set(beforeList.map(q => q.id));
            console.log('Questionnaires before:', beforeList.map(q => q.id));

            // Step 2: Create the new project
            await firstValueFrom(this.questionnaireService.saveQuestionnaire({id: null, name: questionnaireName}));
            console.log('Creation request sent');

            // Step 3: Wait a bit to ensure the project is created in the database
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Step 4: Get the updated list of projects
            const afterList = await firstValueFrom(this.questionnaireService.getQuestionnaires());
            console.log('Questionnaires after:', afterList.map(q => q.id));

            // Step 5: Find the new project by comparing the lists or by name
            let newQuestionnaire = afterList.find(q => !beforeIds.has(q.id));

            if (!newQuestionnaire) {
                // Fallback to finding by name if ID comparison doesn't work
                newQuestionnaire = afterList.find(q => q.name === questionnaireName);
            }

            if (newQuestionnaire) {
                console.log('Found new questionnaire:', newQuestionnaire);

                // Reset form state
                this.questionnaireName = '';
                this.isToggled = false;

                this.router.navigate(['/validation'], {
                    queryParams: {
                        questionnaireId: newQuestionnaire.id
                    }
                });
            } else {
                console.error('Could not find newly created questionnaire');
                // If we can't find the new project, just get the latest one
                const latestQuestionnaires = await firstValueFrom(this.questionnaireService.getQuestionnaires());
                if (latestQuestionnaires.length > 0) {
                    // Sort by ID to get the newest one (assuming IDs are auto-incrementing)
                    const sortedQuestionnaires = latestQuestionnaires.sort((a, b) => b.id - a.id);
                    console.log('Using latest questionnaire as fallback:', sortedQuestionnaires[0]);

                    // Reset form state
                    this.questionnaireName = '';
                    this.isToggled = false;

                    this.router.navigate(['/validation'], {
                        queryParams: {
                            questionnaireId: sortedQuestionnaires[0].id
                        }
                    });
                } else {
                    this.loading = false;
                    console.error('No questionnaires found');
                }
            }
        } catch (error) {
            console.error('Error in creating questionnaire:', error);
            this.loading = false;
            // Try to refresh the list
            this.getQuestionnaires();
        }
    }

    toggleAddNewQuestionnaire(): void {
        this.isToggled = !this.isToggled;
    }

    openActionButtonsMenu(): void {
        this.isOpen = !this.isOpen;
    }

    deleteQuestionnaire(questionnaire: QuestionnaireResponse) {
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

    editQuestionnaire(questionnaire: QuestionnaireResponse) {
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

    downloadQuestionnaire(questionnaire: QuestionnaireResponse) {
        this.questionnaireService.exportQuestionnaire(questionnaire.id, this.translateService.currentLang).subscribe((data) => {

            const downloadURL = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = questionnaire.name + "_" + formatDate(new Date(), 'yyyy-MM-dd', 'en-US') + ".xlsx";
            link.click();

        });
    }

    // Normalize dates to ensure all questionnaires have a lastModified value
    normalizeDates(): void {
        this.questionnaires.forEach(q => {
            // If lastModified is missing, use ID-based timestamp
            if (!q.lastModified) {
                // For display purposes only, doesn't modify the backend
                q.lastModified = getIdBasedTimestamp(q.id);
                console.log(`Generated fallback timestamp for ID ${q.id}: ${q.lastModified}`);
            }
        });
    }

    // Sort questionnaires based on current sort field and direction
    sortQuestionnaires(): void {
        this.questionnaires.sort((a, b) => {
            if (this.sortField === 'name') {
                return this.sortDirection === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else {
                // Parse ISO date strings to timestamps
                const dateA = a.lastModified ? new Date(a.lastModified).getTime() : 0;
                const dateB = b.lastModified ? new Date(b.lastModified).getTime() : 0;

                return this.sortDirection === 'asc'
                    ? dateA - dateB
                    : dateB - dateA;
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

    getActions(questionnaire: any): { name: string, icon: string, onClick: any }[] {
        return [
            {name: "menu.edit", icon: 'edit', onClick: () => this.editQuestionnaire(questionnaire)},
            {name: "menu.delete", icon: 'delete', onClick: () => this.deleteQuestionnaire(questionnaire)},
            {name: "menu.download", icon: 'download', onClick: () => this.downloadQuestionnaire(questionnaire)},
        ];
    }

    protected readonly formatFullDate = formatFullDate;
    protected readonly formatTimeAgo = formatTimeAgo;
}