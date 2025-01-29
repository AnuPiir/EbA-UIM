"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const delete_modal_component_1 = require("./modal/delete-modal/delete-modal.component");
const edit_modal_component_1 = require("./modal/edit-modal/edit-modal.component");
const common_1 = require("@angular/common");
let QuestionnaireComponent = class QuestionnaireComponent {
    constructor(questionnaireService, modalService, translateService) {
        this.questionnaireService = questionnaireService;
        this.modalService = modalService;
        this.translateService = translateService;
        this.loading = true;
        this.isToggled = false;
        this.isOpen = false;
        this.questionnaires = [];
        this.questionnaireName = '';
        this.currentlyEditingQuestionnaires = [];
        this.TIMEOUT_BEFORE_RETRYING = 5000;
        this.validationPath = "/validation";
        this.menuIcon = "more_vert";
    }
    ngOnInit() {
        this.getQuestionnaires();
    }
    getQuestionnaires() {
        this.loading = true;
        this.questionnaireService.getQuestionnaires().subscribe(next => {
            this.questionnaires = next;
            this.loading = false;
        }, () => {
            setTimeout(() => {
                this.questionnaireService.getQuestionnaires().subscribe(next => {
                    this.questionnaires = next;
                    this.loading = false;
                });
            }, this.TIMEOUT_BEFORE_RETRYING);
        });
    }
    addNewQuestionnaire(questionnaireName) {
        this.questionnaireService.saveQuestionnaire({ id: null, name: questionnaireName }).subscribe(next => {
            this.getQuestionnaires();
        });
    }
    toggleAddNewQuistionnaire() {
        this.isToggled = !this.isToggled;
    }
    openActionButtonsMenu() {
        this.isOpen = !this.isOpen;
    }
    deleteQuestionnaire(questionnaire) {
        const initialState = {
            isProject: true,
            questionnaireName: questionnaire.name
        };
        this.modalRef = this.modalService.show(delete_modal_component_1.DeleteModalComponent, {
            class: 'modal-box modal-md', initialState
        });
        this.modalRef.content.onClose.subscribe((result) => {
            if (result.deleteObject) {
                this.loading = true;
                this.questionnaireService.deleteQuestionnaire(questionnaire.id).subscribe(next => {
                    this.questionnaires = this.questionnaires.filter(q => q.id !== questionnaire.id);
                    this.loading = false;
                }, () => this.loading = false);
            }
        });
    }
    editQuestionnaire(questionnaire) {
        const initialState = {
            name: questionnaire.name,
            titleTranslationKey: 'editProjectModal.title',
            inputTranslationKey: 'editProjectModal.input',
        };
        this.modalRef = this.modalService.show(edit_modal_component_1.EditModalComponent, {
            class: 'modal-box modal-md', initialState
        });
        this.modalRef.content.onClose.subscribe((result) => {
            if (result?.edit) {
                this.loading = true;
                this.questionnaireService.saveQuestionnaire({ id: questionnaire.id, name: result.newValue }).subscribe(next => {
                    const questionnaireToEdit = this.questionnaires.find(q => q.id === questionnaire.id);
                    if (questionnaireToEdit) {
                        questionnaireToEdit.name = result.newValue;
                    }
                    this.loading = false;
                }, () => this.loading = false);
            }
        });
    }
    downloadQuestionnaire(questionnaire) {
        this.questionnaireService.exportQuestionnaire(questionnaire.id, this.translateService.currentLang).subscribe((data) => {
            const downloadURL = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = questionnaire.name + "_" + (0, common_1.formatDate)(new Date(), 'yyyy-MM-dd', 'en-US') + ".xlsx";
            link.click();
        });
    }
    getActions(questionnaire) {
        return [
            { name: "menu.edit", icon: 'edit', onClick: () => this.editQuestionnaire(questionnaire) },
            { name: "menu.delete", icon: 'delete', onClick: () => this.deleteQuestionnaire(questionnaire) },
            { name: "menu.download", icon: 'download', onClick: () => this.downloadQuestionnaire(questionnaire) },
        ];
    }
};
QuestionnaireComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-questionnaire',
        templateUrl: './questionnaire.component.html',
        styleUrls: ['./questionnaire.component.css']
    })
], QuestionnaireComponent);
exports.QuestionnaireComponent = QuestionnaireComponent;
//# sourceMappingURL=questionnaire.component.js.map