import { AfterContentChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ValidationService } from './service/validation.service';
import { Validation, ValidationType } from './model/validation';
import { ValidationRow } from './model/validation-row';
import { ValidationCombinationResult } from './model/validation-combination-result';
import { debounceTime, firstValueFrom, Observable, Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { GlobalConstants } from '../constants/global-constants';
import { FeatureGroupResponse } from '../feature-group/model/feature-group-response';
import { FeatureService } from '../feature/service/feature.service';
import { ValidationAnswer } from './model/validation-answer';
import { FeatureRowSpan } from './model/feature-row-span';
import { FeatureResponse } from '../feature/model/feature';
import { FeatureToDisplay } from './model/feature-to-display';
import { StakeholderResponse } from '../stakeholder/model/stakeholder-response';
import { FeaturePreCondition } from '../feature/model/feature-pre-condition';
import { FeaturePreConditionService } from '../feature/service/feature-pre-condition.service';
import { MenuComponent } from '../menus/menu.component';
import { TextareaInputChange } from './model/textarea-input-change';
import { ValidationValue } from './model/validation-value';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit, AfterContentChecked {

  private TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE = 400;
  questionnaireId: number;
  loading: boolean = true;
  translate: boolean = false;
  validations: Validation[] = [];
  validationRowValues: ValidationRow[] = [];
  validationCombinationResults: ValidationCombinationResult[] = [];
  featureRowSpans: FeatureRowSpan[] = [];
  featurePreConditionSpans: FeatureRowSpan[] = [];
  featuresAlreadyDisplayed: FeatureToDisplay[] = [];
  featurePreconditionsAlreadyDisplayed: FeatureToDisplay[] = [];
  menuIcon: string = "arrow_drop_down";
  isToggled: boolean = false;
  colorListToggled:boolean = false;
  isAddingNewRow: boolean = false;
  private inputSubject: Subject<TextareaInputChange> = new Subject<TextareaInputChange>();
  private inputSubscription: Subscription;


  @ViewChild('PreconditionMenu') menuComponent!: MenuComponent;

  @Input() tabIndex: number;
  @Input() columns: string[] = [];
  @Input() featureGroup: FeatureGroupResponse;
  @Input() stakeholders: StakeholderResponse[];
  MenuComponent: any;

  constructor(
    private validationService: ValidationService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private featureService: FeatureService,
    private featurePreconditionService: FeaturePreConditionService,
    private el: ElementRef
  ) {
    this.onLanguageChanged();
  }
  onLanguageChanged() {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      if (this.router.url.startsWith('/validation')) {
        this.reloadComponent();
      }
    });
  }

  ngAfterContentChecked() {
    var vtextarea = this.el.nativeElement.querySelectorAll('textarea')
    for(let i=0;i<vtextarea.length;i++){
      vtextarea[i].style.height = vtextarea[i].scrollHeight + 'px';
    }
  }

  ngOnInit(): void {
    const questionnaireId = this.route.snapshot.queryParamMap.get('questionnaireId');
    if (!questionnaireId  || isNaN(Number(questionnaireId))) {
      this.router.navigate(['questionnaire']);
      return;
    }

    this.questionnaireId = +questionnaireId;
    this.getData();

    this.inputSubscription = this.inputSubject.pipe(debounceTime(300)).subscribe(searchTerm => {
      this.onValidationRowValueChange(searchTerm.inputValue, searchTerm.validationRowAnswer, searchTerm.validation, searchTerm.validationRowValue);
    });
  }

  getData(): void {
    this.loading = true;
    const finished = new Observable(subscriber => {
      this.getValidations(subscriber)
      this.getValidationCombinationResults(subscriber);
    })
    finished.subscribe(_ => {
      if (
        this.validations.length > 0 &&
        this.validationCombinationResults.length > 0
      ) {
        this.getValidationAnswers();
      }
    })
  }

  getValidations(subscriber: any): void {
    this.validationService
      .getValidations()
      .subscribe((next) => {
        this.validations = next.sort((a,b) => a.weight - b.weight);
        subscriber.next(this.validations);
      });
  }

  getValidationCombinationResults(subscriber: any): void {
    this.validationService.getValidationCombinationResults().subscribe((next) => {
      this.validationCombinationResults = next
      subscriber.next(this.validationCombinationResults);
    });
  }

  getValidationAnswers(): void {
    this.validationService.getValidationAnswersByFeatureGroupId(this.featureGroup.id).subscribe(
      next => {
        if (next.length === 0) {
          this.addValidationRow();
        } else {
          this.validationRowValues = this.mapValidationAnswersToRows(next)
            .sort((a, b) => a.answers[0].feature.id - b.answers[0].feature.id || a.answers[0].featurePrecondition.id - b.answers[0].featurePrecondition.id || a.rowId - b.rowId);
          this.mapFeatureRowSpans();
        }
        this.loading = false;
      }
    );
  }


  mapValidationAnswersToRows(validationAnswers: ValidationAnswer[]) {
    const result: { rowId: number; answers: ValidationAnswer[]; }[] = [];
    for (const validationAnswer of validationAnswers) {
      const existingRow = result.find(va => va.rowId === validationAnswer.rowId);
      if (existingRow) {
        existingRow.answers.push(validationAnswer)
        continue;
      }
      result.push({rowId: validationAnswer.rowId, answers: [validationAnswer]})
    }

    return result;
  }


  async addValidationRow(existingFeature?: FeatureResponse, existingPreCondition?: FeaturePreCondition, stakeholder?: StakeholderResponse) {
    this.isAddingNewRow = true;
    let validationRow: ValidationAnswer[] = [];
    let maxRowId = 0;
    if (this.validationRowValues.length > 0) {
      maxRowId = this.validationRowValues.reduce(function(prev, current) {
        return (prev.rowId > current.rowId) ? prev : current
      }).rowId;
    }
    const feature = existingFeature ?? await firstValueFrom(
      this.featureService.create("")
    );
    const featurePrecondition = existingPreCondition ?? await firstValueFrom(
      this.featurePreconditionService.create("")
    );

    for (const v of this.validations) {
      const answer = await firstValueFrom(
        this.validationService.saveValidationAnswer({
        id: null,
        rowId: maxRowId + 1,
        validationId: v.id,
        answer: this.getPrefilledValidationRowAnswer(v.type, feature, existingPreCondition),
        type: v.type,
        questionnaireId: this.questionnaireId,
        featureGroupId: this.featureGroup.id,
        featurePrecondition: featurePrecondition,
        feature: {answer: feature.answer, id: feature.id, customId: feature.customId},
        stakeholder: stakeholder
        })
      );
      validationRow.push(answer);
    }

    this.validationRowValues.push({answers: validationRow, rowId: maxRowId + 1});
    this.validationRowValues = this.validationRowValues.sort((a, b) => a.answers[0].feature.id - b.answers[0].feature.id || a.answers[0].featurePrecondition.id - b.answers[0].featurePrecondition.id || a.rowId - b.rowId);

    this.mapFeatureRowSpans();
    this.updateRelatedValidationAnswers(<Validation>this.validations.find(v => v.type === ValidationType.FEATURE_PRECONDITION), {answers: validationRow, rowId: maxRowId + 1})
    this.isAddingNewRow = false;
  }

  getPrefilledValidationRowAnswer(validationType: ValidationType, featureResponse?: FeatureResponse, featurePreCondition?: FeaturePreCondition, stakeholder?: StakeholderResponse): string {
    if (validationType === ValidationType.FEATURE_PRECONDITION) {
      return featurePreCondition?.answer ? featurePreCondition.answer : '';
    }
    if (validationType === ValidationType.FEATURE) {
      return featureResponse?.answer ? featureResponse.answer : '';
    }
    if (validationType === ValidationType.STAKEHOLDER) {
      return stakeholder?.name ? stakeholder.name : '';
    }
    if (validationType === ValidationType.DO) {
      if (this.translateService.currentLang === GlobalConstants.ET) {
        return 'Kas';
      }
      return 'Do';
    }
    return '';
  }

  getValidationRowAnswer(validation: Validation, validationRowValue: ValidationRow) {
    return validationRowValue.answers.filter(answer => answer.validationId === validation.id)[0];
  }

  isValidationSelectable(validation: Validation): boolean {
    return validation.type === ValidationType.SELECT;
  }

  isValidationTextField(validation: Validation): boolean {
    return validation.type === ValidationType.TEXT;
  }

  isValidationDoField(validation: Validation): boolean {
    return validation.type === ValidationType.DO;
  }

  isValidationFeature(validation: Validation): boolean {
    return validation.type === ValidationType.FEATURE;
  }

  isValidationAutofill(validation: Validation): boolean {
    return validation.type === ValidationType.FILL;
  }

  isValidationStakeholder(validation: Validation): boolean {
    return validation.type === ValidationType.STAKEHOLDER;
  }

  isValidationFeaturePrecondition(validation: Validation): boolean {
    return validation.type === ValidationType.FEATURE_PRECONDITION;
  }

  isValidationExample(validation: Validation): boolean {
    return validation.type === ValidationType.EXAMPLE;
  }


  textAreaValueChange(eventValue: any, validationRowAnswer: ValidationAnswer, validation: Validation, validationRowValue: ValidationRow){
    this.inputSubject.next({
      inputValue: eventValue,
      validationRowAnswer: validationRowAnswer,
      validation: validation,
      validationRowValue: validationRowValue
    })
  }

  async onValidationRowValueChange(eventValue: any, validationRowAnswer: ValidationAnswer, validation: Validation, validationRowValue: ValidationRow) {
      validationRowAnswer.answer = eventValue;
    if (validation.type === ValidationType.FEATURE) {
      validationRowAnswer.feature = await firstValueFrom(
        this.featureService.update(validationRowAnswer.feature.id, eventValue, validationRowAnswer.feature.customId)
      );
    }

    if (validation.type === ValidationType.FEATURE_PRECONDITION) {
      validationRowAnswer.featurePrecondition = await firstValueFrom(
        this.featurePreconditionService.update(validationRowAnswer.featurePrecondition.id, eventValue)
      );
    }

    this.setRelatedRowSpanAnswers(validation, validationRowAnswer, eventValue);

    setTimeout(() => {
      this.validationService.saveValidationAnswer(validationRowAnswer).subscribe(
        next => {
          this.updateRelatedValidationAnswers(validation, validationRowValue);
        }
      );
    }, this.TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE)
  }

  private setRelatedRowSpanAnswers(validation: Validation, validationRowAnswer: ValidationAnswer, eventValue: any) {
    if ([ValidationType.DO, ValidationType.FEATURE_PRECONDITION, ValidationType.STAKEHOLDER].includes(validation.type)) {
      for (let validationRow of this.validationRowValues) {
        for (let answer of validationRow.answers) {
          if (answer.featurePrecondition.id === validationRowAnswer.featurePrecondition.id && answer.id !== validationRowAnswer.id) {
            if (validation.type === ValidationType.FEATURE_PRECONDITION && answer.type === ValidationType.FEATURE_PRECONDITION) {
              answer.answer = eventValue
            }
            if (validation.type === ValidationType.DO && answer.type === ValidationType.DO) {
              if (this.translateService.currentLang === GlobalConstants.ET) {
                answer.answer = "Kas"
              } else {
                answer.answer = "Do"
              }
            }

            if (validation.type === ValidationType.STAKEHOLDER && answer.type === ValidationType.STAKEHOLDER) {
              answer.stakeholder = validationRowAnswer.stakeholder
              if (answer.stakeholder) {
                answer.answer = answer.stakeholder.name
              }
            }

            setTimeout(() => {
              this.validationService.saveValidationAnswer(answer).subscribe(
                next => {
                }
              );
            }, this.TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE)
          }
        }
        this.updateRelatedValidationAnswers(validation, validationRow);
      }
    }
  }

  updateRelatedValidationAnswers(validation: Validation, validationRowValue: ValidationRow): void {
    const validationsFilledByAnswer = this.validations.filter(foundValidation =>
      foundValidation.validationAutofillList.some(autofill =>
        autofill.validationFilledById !== null && autofill.validationFilledById === validation.id
      )
    );

    for (let validationFilledByAnswer of validationsFilledByAnswer) {
      if (validationFilledByAnswer) {
        this.setAutoFillAnswers(validationFilledByAnswer, validationRowValue);
      }
    }
  }

  private setNoExampleAnswer(validationRowValue: ValidationRow) { //TODO jätkuarendus
    let exampleAnswer = '';
    let combinationAnswer = '';

    if (this.isCurrentLangEt) {
      exampleAnswer = 'Näidet pole';
      combinationAnswer = this.validationCombinationResults[this.validationCombinationResults.length-1].resultEt;
    } else {
      exampleAnswer = 'No example';
      combinationAnswer = this.validationCombinationResults[this.validationCombinationResults.length-1].resultEn;
    }

    //Example answer
    const exampleValidationAnswer = validationRowValue.answers.find(a => a.type === ValidationType.EXAMPLE);
    const exampleValidation = this.validations.find(v => v.type === ValidationType.EXAMPLE);
    if (exampleValidationAnswer && exampleValidation) {
      this.onValidationRowValueChange(
        exampleAnswer,
        exampleValidationAnswer,
        exampleValidation,
        validationRowValue
      )
    }
    //Combination anwer
    const combinationValidation = this.validations.find(v => v.validationAutofillList.find(vafl => vafl.type === 'COMBINATION'));
    const combinationValidationAnswer = validationRowValue.answers.find(a => a.validationId === combinationValidation?.id);
    if (combinationValidation && combinationValidationAnswer) {
      this.onValidationRowValueChange(
        combinationAnswer,
        combinationValidationAnswer,
        combinationValidation,
        validationRowValue
      )
    }
  }
  private setAutoFillAnswers(validationFilledByAnswer: Validation, validationRowValue: ValidationRow) {
    if (!this.allRequiredAnswersFilled(validationFilledByAnswer, validationRowValue)) {
      return;
    }

    const answerValues = []
    let isAutofillTypeCombination = true;
    let isAutoFillFromSelect = true;
    for (let validationFilledBy of validationFilledByAnswer.validationAutofillList) {
      if (validationFilledBy.type !== 'COMBINATION') {
        isAutofillTypeCombination = false;
      }
      const answer = validationRowValue.answers.find(a => a.validationId === validationFilledBy.validationFilledById);
      if (answer != null) {
        if (answer.type !== 'SELECT') {
          isAutoFillFromSelect = false;
        }
        answerValues.push({
          validationId: answer.validationId,
          value: answer.answer,
          weight: validationFilledBy.weight,
          hasMatch: false
        })
      }
    }

    const answerValuesSortedByWeight = answerValues.sort(({ weight: a }, { weight: b }) => a - b);

    if (isAutofillTypeCombination && isAutoFillFromSelect) {
      this.updateCombinationAutoFillAnswers(answerValuesSortedByWeight, validationRowValue, validationFilledByAnswer);

      return;
    }

    const answerToFill = validationRowValue.answers.find(a => a.validationId === validationFilledByAnswer.id);

    if (answerToFill) {
      answerToFill.answer = this.getAnswerToSet(answerValuesSortedByWeight);
      this.validationService.saveValidationAnswer(answerToFill).subscribe(next => {});
    }
  }

   getAnswerToSet(answerValuesSortedByWeight: any[]) {
    if (answerValuesSortedByWeight.length > 0) {
      let combinationAnswer = '';
      for (let answerValueSortedByWeight of answerValuesSortedByWeight) {
        combinationAnswer += ' ' + answerValueSortedByWeight.value;
      }
      return combinationAnswer;
    }

    return answerValuesSortedByWeight[0].value
  }

  allRequiredAnswersFilled(validationFilledByAnswer: Validation, validationRowValue: ValidationRow): boolean {
    for (let validationFilledBy of validationFilledByAnswer.validationAutofillList) {
      const answer = validationRowValue.answers.find(a => a.validationId === validationFilledBy.validationFilledById);
      if (answer == null  || answer.answer == null) {
        return false;
      }
    }

    return true;
  }

  updateCombinationAutoFillAnswers(answerValuesSortedByWeight: any[], validationRowValue: ValidationRow, validationFilledByAnswer: Validation) {
    for (let combinationResult of this.validationCombinationResults) {
      if (this.hasMatchingCombination(combinationResult, answerValuesSortedByWeight)) {
        const correctAnswer = validationRowValue.answers.find(a => a.validationId === validationFilledByAnswer.id);
        if (correctAnswer) {
          correctAnswer.answer = this.getTranslation(combinationResult);
          this.validationService.saveValidationAnswer(correctAnswer).subscribe(next => {
            this.updateRelatedValidationAnswers(validationFilledByAnswer, validationRowValue);
          });
        }
        return;
      }
    }
  }

  hasMatchingCombination(combinationResult: ValidationCombinationResult, answerValuesSortedByWeightOriginal: any[]) {
    let answerValuesSortedByWeight: any[] = JSON.parse(JSON.stringify(answerValuesSortedByWeightOriginal));
    for (let combination of combinationResult.validationCombinations) {
      const foundAnswer = answerValuesSortedByWeight.find(
        av => av.validationId == combination.validationResponse.id && av.value == combination.validationValue);
      if (foundAnswer) {
        foundAnswer.hasMatch = true;
      }
    }
    let hasMatch = true;
    for (let answerValue of answerValuesSortedByWeight) {
      if (!answerValue.hasMatch) {
        hasMatch = false;
      }
    }
    return hasMatch;
  }

  deleteRow(rowId: number) {
    this.validationService.deleteValidationAnswersByQuestionnaireIdAndRowId(this.questionnaireId, rowId).subscribe(
      next => {
        this.validationRowValues = this.validationRowValues.filter(vrv => vrv.rowId !== rowId);
        this.reloadComponent();
      }
    );
  }

  getTranslation(value: any): string {
    if (this.isCurrentLangEt) {
      return value.nameEt ? value.nameEt : value.resultEt;
    }

    return value.nameEn ? value.nameEn : value.resultEn;
  }

  get isCurrentLangEt(): boolean {
    return this.translateService.currentLang === GlobalConstants.ET;
  }


  mapFeatureRowSpans():void {
    const featureRowSpans: FeatureRowSpan[] = [];
    const featurePreConditionRowSpans: FeatureRowSpan[] = [];
    for (let validationRow of this.validationRowValues) {
      for (let validationAnswer of validationRow.answers) {
        if (!featureRowSpans.map(a => a.featureId).includes(validationAnswer.feature.id)){
          featureRowSpans.push({featureId: validationAnswer.feature.id, rowIdsSpanningFeature: [validationAnswer.rowId]});
        } else {
          const featureRowSpan = featureRowSpans.find(o => o.featureId === validationAnswer.feature.id);
          if (featureRowSpan != null && !featureRowSpan.rowIdsSpanningFeature.includes(validationAnswer.rowId)) {
            featureRowSpan.rowIdsSpanningFeature.push(validationAnswer.rowId);
          }
        }

        if (!featurePreConditionRowSpans.map(a => a.featureId).includes(validationAnswer.featurePrecondition.id)){
          featurePreConditionRowSpans.push({featureId: validationAnswer.featurePrecondition.id, rowIdsSpanningFeature: [validationAnswer.rowId]});
        } else {
          const featureRowSpan = featurePreConditionRowSpans.find(o => o.featureId === validationAnswer.featurePrecondition.id);
          if (featureRowSpan != null && !featureRowSpan.rowIdsSpanningFeature.includes(validationAnswer.rowId)) {
            featureRowSpan.rowIdsSpanningFeature.push(validationAnswer.rowId);
          }
        }
      }
    }
    this.featurePreConditionSpans = featurePreConditionRowSpans;
    this.featureRowSpans = featureRowSpans;
  }


  getAnswerRowSpanAndMapAsDisplayed(validation: Validation, validationRow: ValidationRow): number {
    if (validation.type === ValidationType.FEATURE) {
      const featureId = validationRow.answers[0].feature.id;
      return this.featureRowSpans.find(a => a.featureId === featureId)?.rowIdsSpanningFeature.length ?? 1;
    }
    if (validation.type === ValidationType.FEATURE_PRECONDITION || validation.type === ValidationType.STAKEHOLDER || validation.type === ValidationType.DO) {
      const featureId = validationRow.answers[0].featurePrecondition.id;
      return this.featurePreConditionSpans.find(a => a.featureId === featureId)?.rowIdsSpanningFeature.length ?? 1;
    }
    return 1;
  }

  isAnswerNotDisplayed(validation: Validation, validationRow: ValidationRow): boolean {
    if (validation.type === ValidationType.FEATURE) {
      const featureId = validationRow.answers[0].feature.id;
      const existingFeatureToDisplay = this.featuresAlreadyDisplayed.find(f => f.featureId === featureId)
      if (!existingFeatureToDisplay) {
        this.featuresAlreadyDisplayed.push({featureId: featureId, rowIdToDisplayOn: validationRow.rowId});
        return true;
      }
      return existingFeatureToDisplay?.rowIdToDisplayOn === validationRow.rowId;
    }
    if (validation.type === ValidationType.FEATURE_PRECONDITION) {
      const featureId = validationRow.answers[0].featurePrecondition.id;
      const existingFeaturePreconditionToDisplay = this.featurePreconditionsAlreadyDisplayed.find(f => f.featureId === featureId)
      if (!existingFeaturePreconditionToDisplay) {
        this.featurePreconditionsAlreadyDisplayed.push({featureId: featureId, rowIdToDisplayOn: validationRow.rowId});
        return true;
      }
      return existingFeaturePreconditionToDisplay?.rowIdToDisplayOn === validationRow.rowId;
    }

    if (validation.type === ValidationType.STAKEHOLDER || validation.type === ValidationType.DO) {
      const featureId = validationRow.answers[0].featurePrecondition.id;
      const existingFeaturePreconditionToDisplay = this.featurePreconditionsAlreadyDisplayed.find(f => f.featureId === featureId)
      if (!existingFeaturePreconditionToDisplay) {
        return true;
      }
      return existingFeaturePreconditionToDisplay?.rowIdToDisplayOn === validationRow.rowId;
    }
    return true;
  }

  getStickyClassByIndex(i: number, isHeader?: boolean): string {
    if (i === 0) {
      return 'content-cell-first-child'
    } else if (i === 1) {
      return 'content-cell-second-child'
    } else if (i === 2) {
      return 'content-cell-third-child'
    } else if (i === 3) {
      return 'content-cell-fourth-child'
    } else if (i === 4) {
      return 'content-cell-fifth-child'
    } else if (i > 4 && i < 9) {
      return 'content-cell-four-options'
    } else if (i === 9) {
      return 'content-cell-tenth-child'
    } else if (i === 10) {
      if (isHeader) {
        return 'content-header-eleventh-child'
      }
      return 'content-cell-eleventh-child'
    } else if (i === 11) {
      return 'content-cell-twelveth-child'
    } else if (i === 12) {
      return 'content-cell-thirteenth-child'
    } else if (i === 13) {
      return 'content-cell-fourteenth-child'
    } else if (i === 14) {
      return 'content-cell-fifteenth-child'
    }
    return '';
  }

  onStakeholderChange(stakeholder: any, validation: Validation, validationRowValue: ValidationRow) {
    const validationAnswer = this.getValidationRowAnswer(validation, validationRowValue)
    validationAnswer.stakeholder = stakeholder;
    this.onValidationRowValueChange(stakeholder ? stakeholder.name : '', validationAnswer, validation, validationRowValue);
  }

  getRowPreConditionAnswer(validationRow: ValidationRow): ValidationAnswer {
    return <ValidationAnswer>validationRow.answers.find(a => a.type === ValidationType.FEATURE_PRECONDITION);
  }

  getFeatureActions(validationRowValue: ValidationRow):{name: string, icon: string, onClick: any}[] {
    return [
      {name: "menu.deleteFeature", icon: 'delete', onClick: () => this.deleteFeature(validationRowValue.answers[0].feature.id)},
    ];
  }

  getPreconditionActions(validationRowValue: ValidationRow):{name: string, icon: string, onClick: any}[] {
    return [
      {name: "menu.addPrecondition", icon: 'add', onClick: () => this.addValidationRow(validationRowValue.answers[0].feature)},
      {name: "menu.deletePrecondition", icon: 'delete', onClick: () => this.deleteFeaturePreCondition(validationRowValue.answers[0].featurePrecondition.id)},
    ];
  }

  getExampleActions(validationRowValue: ValidationRow):{name: string, icon: string, onClick: any}[] {
    return [
      {name: "menu.addExample", icon: 'add', onClick: () => this.addValidationRow(validationRowValue.answers[0].feature, this.getRowPreConditionAnswer(validationRowValue).featurePrecondition, validationRowValue.answers[0].stakeholder)},
      {name: "menu.deleteExample", icon: 'delete', onClick: () => this.deleteRow(validationRowValue.rowId)},
      {name: "menu.noExample", icon: 'cancel', onClick: () => this.setNoExampleAnswer(validationRowValue)}
    ];
  }

  deleteFeature(id: number) {
    this.featureService.delete(id).subscribe(next => this.reloadComponent());
  }

  deleteFeaturePreCondition(id: number) {
    this.featurePreconditionService.delete(id).subscribe(next => this.reloadComponent());
  }

  reloadComponent() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['validation'], { queryParams: {questionnaireId: this.questionnaireId, tabIndex: this.tabIndex}}).then(()=>{
      });
    });
  }

  getStakeholderColorClass(answer: any, column: any): string {
    if (answer !== null && (column == 2 || column == 11)) {
      let currentStakeholder: string = answer.trim();
      let index = 0;

      if (currentStakeholder.length == 0) {
        return "none";
      }

      for (let i = 0; i < this.stakeholders.length; i++) {
        index = i;
        if (currentStakeholder === this.stakeholders[i].name) {
          break;
        }
      }
      let colorIndex = index % GlobalConstants.STAKEHOLDER_COLOR_ORDER.length;
      return GlobalConstants.STAKEHOLDER_COLOR_ORDER[colorIndex];
    }
    else {
      return "";
    }
  }

  getStakeHolderAction(validation: Validation, validationRowValue: ValidationRow): any {
    return (stakeHolder: StakeholderResponse) => this.onStakeholderChange(stakeHolder, validation, validationRowValue)
  }

  getStakeHolderMenuAction(validationRowValue: ValidationRow): any {
    const validationForStakeHolder = this.validations.find(v => v.type === ValidationType.STAKEHOLDER);
    if (validationForStakeHolder) {
      return this.getStakeHolderAction(validationForStakeHolder, validationRowValue);
    }
  }

  onFeatureCustomIdChange(customId: any, feature: FeatureResponse) {
    setTimeout(() => {
      this.featureService.update(feature.id, feature.answer, customId).subscribe(next => {});
    }, this.TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE)
  }

  autoGrow(event: Event) {
    const element = event.target as HTMLTextAreaElement;
    element.style.height = '5px';
    element.style.height = (element.scrollHeight) + 'px';
  }

  getValidationValue(answer: string): ValidationValue {
    return (<any>ValidationValue)[answer];
  }
}

