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
import {firstValueFrom} from "rxjs";
import { ChangeDetectorRef } from '@angular/core';

interface PaginationItem {
    value: number | string
    isEllipsis: boolean
}

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

    isNewestFirst: boolean = true;
    sortField: 'name' | 'lastModified' = 'lastModified';
    sortDirection: 'asc' | 'desc' = 'desc';

    notificationVisible = false;
    notificationMessage = '';

    currentPage: number = 1;
    questionnairesPerPage: number = 10;
    totalPages: number = 1;

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
        this.getQuestionnairesWithRetry().then(() => {
            this.sortQuestionnaires();
            this.updatePagination()
            this.loading = false;
            this.cdr.detectChanges();
        })
    }

    sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getQuestionnairesWithRetry() {
        while (true) {
            try {
                const questionnaires = await firstValueFrom(this.questionnaireService.getQuestionnaires());
                if (questionnaires) {
                    this.questionnaires = questionnaires;
                    break;
                }
            } catch (error) {
                console.warn("Failed to fetch questionnaires. Retrying in 3 seconds...", error);
            }
            await this.sleep(3000);
        }
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

    async copyQuestionnaire(questionnaireId: number) {
        this.questionnaireService.copyQuestionnaire(questionnaireId).subscribe(
            response => {
                if (response) {
                    this.router.navigate(['/validation'], {
                        queryParams: {
                            questionnaireId: response.id
                        }
                    });
                }
            }
        )
    }

    toggleAddNewQuestionnaire(): void {
        this.isToggled = !this.isToggled;
    }

    handleOpenAddNewQuestionnaire() {
        if (!this.isToggled) {
            this.toggleAddNewQuestionnaire();
        }
    }

    handleCloseAddNewQuestionnaire(event: Event) {
        if (this.isToggled) {
            this.toggleAddNewQuestionnaire();
            event.stopPropagation();
        }
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
                name: "menu.copy",
                icon: 'content_copy',
                onClick: () => this.copyQuestionnaire(questionnaire.id)
            },
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
                const comparison = new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
                return this.isNewestFirst ? comparison : -comparison;
            }
        });
    }

    toggleSortOrder() {
        this.isNewestFirst = !this.isNewestFirst;
        this.sortDirection = this.isNewestFirst ? 'desc' : 'asc';
        this.sortQuestionnaires();
    }

    getTimeAgo(date: Date | string): string {

        const now = new Date();
        const past = new Date(date);
        const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        const isEstonian = this.translateService.currentLang === 'et';

        if (seconds < 60) {
            return isEstonian ? 'äsja' : 'just now';
        } else if (minutes === 1) {
            return isEstonian ? '1 minut tagasi' : '1 minute ago';
        } else if (minutes < 60) {
            return isEstonian ? `${minutes} minutit tagasi` : `${minutes} minutes ago`;
        } else if (hours === 1) {
            return isEstonian ? '1 tund tagasi' : '1 hour ago';
        } else if (hours < 24) {
            return isEstonian ? `${hours} tundi tagasi` : `${hours} hours ago`;
        } else if (days === 1) {
            return isEstonian ? '1 päev tagasi' : '1 day ago';
        } else if (days < 7) {
            return isEstonian ? `${days} päeva tagasi` : `${days} days ago`;
        } else if (weeks === 1) {
            return isEstonian ? '1 nädal tagasi' : '1 week ago';
        } else if (weeks < 4) {
            return isEstonian ? `${weeks} nädalat tagasi` : `${weeks} weeks ago`;
        } else if (months === 1) {
            return isEstonian ? '1 kuu tagasi' : '1 month ago';
        } else if (months < 12) {
            return isEstonian ? `${months} kuud tagasi` : `${months} months ago`;
        } else if (years === 1) {
            return isEstonian ? '1 aasta tagasi' : '1 year ago';
        } else {
            return isEstonian ? `${years} aastat tagasi` : `${years} years ago`;
        }
    }

    updatePagination() {
        this.totalPages = Math.ceil(this.questionnaires.length / this.questionnairesPerPage);
        this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
    }

    getPaginatedQuestionnaires(): Questionnaire[] {
        const startIndex = (this.currentPage - 1) * this.questionnairesPerPage;
        const endIndex = startIndex + this.questionnairesPerPage;
        return this.questionnaires.slice(startIndex, endIndex);
    }

    getPageNumbers(): PaginationItem[] {
        if (this.totalPages <= 7) {
            return Array.from({ length: this.totalPages }, (_, i) => ({
                value: i + 1,
                isEllipsis: false
            }));
        }

        const pageNumbers: PaginationItem[] = [];
        const currentPage = this.currentPage;

        pageNumbers.push({ value: 1, isEllipsis: false });

        if (currentPage > 4) {
            pageNumbers.push({ value: '...', isEllipsis: true });
        }

        let start = Math.max(2, currentPage - 2);
        let end = Math.min(this.totalPages - 1, currentPage + 2);

        if (currentPage <= 4) {
            end = 5;
        }

        if (currentPage > this.totalPages - 4) {
            start = this.totalPages - 4;
        }

        for (let i = start; i <= end; i++) {
            pageNumbers.push({ value: i, isEllipsis: false });
        }

        if (currentPage < this.totalPages - 3) {
            pageNumbers.push({ value: '...', isEllipsis: true });
        }

        pageNumbers.push({ value: this.totalPages, isEllipsis: false });

        return pageNumbers;
    }

    goToPage(pageValue: number | string) {
        const pageNumber = Number(pageValue);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= this.totalPages) {
            this.currentPage = pageNumber;
            this.cdr.detectChanges();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.cdr.detectChanges();
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.cdr.detectChanges();
        }
    }

    showPagination(): boolean {
        return this.questionnaires.length > this.questionnairesPerPage;
    }
}