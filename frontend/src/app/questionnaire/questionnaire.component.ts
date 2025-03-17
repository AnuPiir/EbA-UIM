import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionnaireService } from './service/questionnaire.service';
import { QuestionnaireResponse } from './model/questionnaire-response';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from './modal/delete-modal/delete-modal.component';
import { EditModalComponent } from './modal/edit-modal/edit-modal.component';
import { formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
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


  constructor(
      private router: Router,
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

        // Use Angular Router for navigation instead of direct URL manipulation
        // This works correctly in both browser and Electron environments
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