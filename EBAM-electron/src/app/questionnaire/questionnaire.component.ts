import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from './service/questionnaire.service';
import { QuestionnaireResponse } from './model/questionnaire-response';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from './modal/delete-modal/delete-modal.component';
import { EditModalComponent } from './modal/edit-modal/edit-modal.component';
import { formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

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


  constructor(
    private questionnaireService: QuestionnaireService,
    private modalService: BsModalService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.getQuestionnaires();
  }

  getQuestionnaires(): void {
    this.loading = true;
    this.questionnaireService.getQuestionnaires().subscribe(
      next => {
        this.questionnaires = next;
        this.loading = false;
      }, () => {
        setTimeout(() => {
          this.questionnaireService.getQuestionnaires().subscribe(
            next => {
              this.questionnaires = next;
              this.loading = false;
            })
      }, this.TIMEOUT_BEFORE_RETRYING);}
    );
  }

  addNewQuestionnaire(questionnaireName: string) {
    this.questionnaireService.saveQuestionnaire({id: null, name: questionnaireName}).subscribe(
      next => {
        this.getQuestionnaires();
      }
    )
  }

  toggleAddNewQuistionnaire(): void {
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
        this.questionnaireService.deleteQuestionnaire(questionnaire.id).subscribe( next => {
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
        this.questionnaireService.saveQuestionnaire({id: questionnaire.id, name: result.newValue}).subscribe( next => {
          const questionnaireToEdit = this.questionnaires.find(q => q.id === questionnaire.id);
          if (questionnaireToEdit){
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

  getActions(questionnaire: any):{name: string, icon: string, onClick: any}[] {
    return [
      {name: "menu.edit", icon: 'edit', onClick: () => this.editQuestionnaire(questionnaire)},
      {name: "menu.delete", icon: 'delete', onClick: () => this.deleteQuestionnaire(questionnaire)},
      {name: "menu.download", icon: 'download', onClick: () => this.downloadQuestionnaire(questionnaire)},
    ];
  }
}
