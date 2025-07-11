import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureGroupService } from './service/feature-group.service';
import { FeatureGroupResponse } from './model/feature-group-response';
import { MatTabGroup } from '@angular/material/tabs';
import { StakeholderService } from '../stakeholder/service/stakeholder.service';
import { StakeholderResponse } from '../stakeholder/model/stakeholder-response';
import { GlobalConstants } from '../constants/global-constants';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from '../questionnaire/modal/delete-modal/delete-modal.component';
import { EditModalComponent } from '../questionnaire/modal/edit-modal/edit-modal.component';
import { ValidationService } from '../validation/service/validation.service';
import { firstValueFrom } from 'rxjs';
import { FeatureService } from '../feature/service/feature.service';
import { FeaturePreConditionService } from '../feature/service/feature-pre-condition.service';
import { ValidationAnswer } from '../validation/model/validation-answer';
import { Validation, ValidationType } from '../validation/model/validation';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-feature-group',
  templateUrl: './feature-group.component.html',
  styleUrls: ['./feature-group.component.css']
})
export class FeatureGroupComponent implements OnInit {
  featureGroups: FeatureGroupResponse[] = [];
  stakeholders: StakeholderResponse[] = [];

  questionnaireId: number;
  tabIndex: number;
  loading: boolean = true;
  tabsLoading: boolean = false;
  isToggledGroupAdding: boolean = false;
  isToggledGroupList: boolean = true;
  isToggledStakeholderAdding: boolean = false;
  isToggledStakeholderList: boolean = true;
  featureGroupName: string = '';
  stakeholderName: string = '';
  @ViewChild('featureGroupTabs', {static: false}) tab: MatTabGroup;
  modalRef: BsModalRef;
  validations: Validation[] = [];
  defaultTabName: string = "Vahekaart 1";
  showProjectsWrapper: boolean = true;

  constructor(
      private featureGroupService: FeatureGroupService,
      private route: ActivatedRoute,
      private router: Router,
      private stakeholderService: StakeholderService,
      private validationService: ValidationService,
      private featureService: FeatureService,
      private featurePreconditionService: FeaturePreConditionService,
      private modalService: BsModalService,
      private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    const questionnaireId = this.route.snapshot.queryParamMap.get('questionnaireId');
    const tabIndex = this.route.snapshot.queryParamMap.get('tabIndex');
    if (!questionnaireId  || isNaN(Number(questionnaireId))) {
      this.router.navigate(['questionnaire']);
      return;
    }
    if (!(!tabIndex || isNaN(Number(tabIndex)))) {
      this.tabIndex = +tabIndex;
    }
    this.questionnaireId = +questionnaireId;

    // Translate default tab name if needed
    this.translateService.get('addGroup.defaultTabName').subscribe((res: string) => {
      if (res && res !== 'addGroup.defaultTabName') {
        this.defaultTabName = res;
      }
    });

    this.getData();
  }

  toggleProjectsWrapper() {
    this.showProjectsWrapper = !this.showProjectsWrapper;
  }

  toggleAddNewGroup(): void {
    this.isToggledGroupAdding = !this.isToggledGroupAdding;
  }

  handleOpenAddNewGroup() {
    if (!this.isToggledGroupAdding) {
      this.toggleAddNewGroup();
    }
  }

  handleCloseAddNewGroup(event: Event) {
    if (this.isToggledGroupAdding) {
      this.toggleAddNewGroup();
      event.stopPropagation();
    }
  }

  toggleGroupList(): void {
    this.isToggledGroupList = !this.isToggledGroupList;
  }

  toggleAddNewStakeholder(): void {
    this.isToggledStakeholderAdding = !this.isToggledStakeholderAdding;
  }

  handleOpenAddNewStakeholder() {
    if (!this.isToggledStakeholderAdding) {
      this.toggleAddNewStakeholder();
    }
  }

  handleCloseAddNewStakeholder(event: Event) {
    if (this.isToggledStakeholderAdding) {
      this.toggleAddNewStakeholder();
      event.stopPropagation();
    }
  }

  toggleStakeholderList(): void {
    this.isToggledStakeholderList = !this.isToggledStakeholderList;
  }

  getData(): void {
    // Fetch validations first as they're needed for adding rows
    this.validationService.getValidations().subscribe(validations => {
      this.validations = validations.sort((a, b) => a.weight - b.weight);

      // Get feature groups
      this.featureGroupService
          .getFeatureGroupsByQuestionnaireId(this.questionnaireId)
          .subscribe(async (next) => {
            this.featureGroups = next.sort((a, b) => a.id - b.id);

            // If no feature groups exist, create a default one
            if (this.featureGroups.length === 0) {
              try {
                const defaultGroup = await this.createDefaultFeatureGroup();
                // Reload the page to show the new feature group with a row
                this.router.navigate(['/validation'], {
                  queryParams: {
                    questionnaireId: this.questionnaireId,
                    tabIndex: 0
                  }
                });
              } catch (error) {
                console.error("Error creating default feature group:", error);
              }
            }

            this.loading = false;
            setTimeout(() => {
              if (this.tab) {
                this.tab.selectedIndex = this.tabIndex;
              }
            });
          });

      // Get stakeholders
      this.stakeholderService
          .getStakeholdersByQuestionnaireId(this.questionnaireId)
          .subscribe((next) => {
            this.stakeholders = next.sort((a, b) => a.id - b.id);
          });
    });
  }

  async createDefaultFeatureGroup(): Promise<FeatureGroupResponse> {
    // Create default feature group
    const createdFeatureGroup = await firstValueFrom(
        this.featureGroupService.createFeatureGroup(this.questionnaireId, this.defaultTabName)
    );
    this.featureGroups.push(createdFeatureGroup);

    // Create feature and precondition for the first row
    const feature = await firstValueFrom(this.featureService.create(""));
    const featurePrecondition = await firstValueFrom(this.featurePreconditionService.create(""));

    // Create validation answers for each validation type
    let validationRow: ValidationAnswer[] = [];
    let rowId = 1; // First row

    for (const validation of this.validations) {
      const answer = await firstValueFrom(
          this.validationService.saveValidationAnswer({
            id: null,
            rowId: rowId,
            validationId: validation.id,
            answer: this.getPrefilledValidationRowAnswer(validation.type, feature, featurePrecondition),
            type: validation.type,
            questionnaireId: this.questionnaireId,
            featureGroupId: createdFeatureGroup.id,
            featurePrecondition: featurePrecondition,
            feature: { answer: feature.answer, id: feature.id, customId: feature.customId },
            stakeholder: undefined
          })
      );
      validationRow.push(answer);
    }

    return createdFeatureGroup;
  }

  getPrefilledValidationRowAnswer(validationType: ValidationType, feature?: any, featurePreCondition?: any): string {
    if (validationType === ValidationType.FEATURE_PRECONDITION) {
      return featurePreCondition?.answer ? featurePreCondition.answer : '';
    }
    if (validationType === ValidationType.FEATURE) {
      return feature?.answer ? feature.answer : '';
    }
    if (validationType === ValidationType.DO) {
      if (this.translateService.currentLang === GlobalConstants.ET) {
        return 'Kas';
      }
      return 'Do';
    }
    return '';
  }

  createNewFeatureGroup(featureGroupName: string) {
    this.featureGroupService.createFeatureGroup(this.questionnaireId, featureGroupName)
        .subscribe(next => {
          this.featureGroups.push(next);
          this.featureGroupName = "";
        })
  }

  createNewStakeholder(stakeholderName: string) {
    this.stakeholderService.createStakeholder(this.questionnaireId, stakeholderName)
        .subscribe(next => {
          this.stakeholders.push(next);
          this.stakeholderName = "";
        })
  }

  deleteStakeholder(id: number) {
    this.tabsLoading = true;
    this.stakeholderService.deleteStakeholder(id)
        .subscribe(next =>  {
          this.stakeholders = this.stakeholders.filter(s => s.id !== id)
          this.tabsLoading = false;
        })
  }

  updateStakeHolder(id: number, name: string) {
    this.tabsLoading = true;
    this.stakeholderService.update(id, name)
        .subscribe(next =>  {
          const stakeholderToEdit = this.stakeholders.find(s => s.id === id);
          if (stakeholderToEdit) {
            stakeholderToEdit.name = name;
          }
          this.tabsLoading = false;
        })
  }

  deleteFeatureGroup(id: number) {
    this.tabsLoading = true;
    this.featureGroupService.deleteFeatureGroup(id)
        .subscribe(next => {
          this.featureGroups = this.featureGroups.filter(fg => fg.id !== id)
          this.tabsLoading = false;
        })
  }

  updateFeatureGroup(id: number, name: string) {
    this.tabsLoading = true;
    this.featureGroupService.updateFeatureGroup(id, name)
        .subscribe(next => {
          const featureGroupToEdit = this.featureGroups.find(fg => fg.id === id)
          if (featureGroupToEdit) {
            featureGroupToEdit.name = name;
          }
          this.tabsLoading = false;
        })
  }

  getStakeholderColorClass(i: number): string {
    let colorIndex = i % GlobalConstants.STAKEHOLDER_COLOR_ORDER.length;
    return GlobalConstants.STAKEHOLDER_COLOR_ORDER[colorIndex];
  }

  openFeatureGroupDeleteModal(featureGroup: FeatureGroupResponse) {
    const initialState = {
      isFeatureGroup: true
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-box modal-md', initialState
    });
    this.modalRef.content.onClose.subscribe((result: any) => {
      if (result.deleteObject) {
        this.deleteFeatureGroup(featureGroup.id)
      }
    });
  }

  openFeatureGroupEditModal(featureGroup: FeatureGroupResponse) {
    const initialState = {
      name: featureGroup.name,
      titleTranslationKey: 'editFeatureGroupModal.title',
      inputTranslationKey: 'editFeatureGroupModal.input',
    };
    this.modalRef = this.modalService.show(EditModalComponent, {
      class: 'modal-box modal-md', initialState
    });

    this.modalRef.content.onClose.subscribe((result: any) => {
      if (result?.edit) {
        this.updateFeatureGroup(featureGroup.id, result?.newValue);
      }
    });
  }

  openStakeholderDeleteModal(stakeholder: StakeholderResponse) {
    const initialState = {
      isStakeholder: true
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-box modal-md', initialState
    });
    this.modalRef.content.onClose.subscribe((result: any) => {
      if (result.deleteObject) {
        this.deleteStakeholder(stakeholder.id);
      }
    });
  }

  openStakeholderEditModal(stakeholder: StakeholderResponse) {
    const initialState = {
      name: stakeholder.name,
      titleTranslationKey: 'editStakeholderModal.title',
      inputTranslationKey: 'editStakeholderModal.input',
    };
    this.modalRef = this.modalService.show(EditModalComponent, {
      class: 'modal-box modal-md', initialState
    });
    this.modalRef.content.onClose.subscribe((result: any) => {
      if (result?.edit) {
        this.updateStakeHolder(stakeholder.id, result?.newValue);
      }
    });
  }

  focusValidationTable(event: Event) {
    event.preventDefault();
    if (this.tab) {
      this.tab.selectedIndex = 0;
    }
    setTimeout(() => {
      const firstTab = document.querySelector('[role="tab"]') as HTMLElement;
      firstTab?.focus();
    }, 100);
  }

  getFeatureGroupEditAction(featureGroup: any):any {
    return () => this.openFeatureGroupEditModal(featureGroup);
  }

  getFeatureGroupDeleteAction(featureGroup: any):any {
    return () => this.openFeatureGroupDeleteModal(featureGroup);
  }

  getStakeholderEditAction(stakeholder: any):any {
    return () => this.openStakeholderEditModal(stakeholder);
  }

  getStakeholderDeleteAction(stakeholder: any):any {
    return () => this.openStakeholderDeleteModal(stakeholder);
  }
}