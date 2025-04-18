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
import { HttpClient } from '@angular/common/http';
import { Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import {NoSituationModalComponent} from "../questionnaire/modal/no-situation-modal/no-situation-modal.component";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit, AfterContentChecked {

  private TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE = 500;
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
  showColorSelection: boolean = false;
  showColorSelectionMap: Record<number, boolean> = {};

  @ViewChild('PreconditionMenu') menuComponent!: MenuComponent;
  @ViewChild('formattedSentence', { static: false }) formattedSentenceRef!: ElementRef;

  @Input() tabIndex: number;
  @Input() columns: string[] = [];
  @Input() featureGroup: FeatureGroupResponse;
  @Input() stakeholders: StakeholderResponse[];
  MenuComponent: any;


  colorOptions = [
    { name: 'Beige', value: 'var(--light-beige)' },
    { name: 'Grey', value: 'var(--light-grey)' },
    { name: 'Green', value: 'var(--light-green)' },
    { name: 'Yellow', value: 'var(--light-yellow)' },
    { name: 'Orange', value: 'var(--light-orange)' },
    { name: 'Red', value: 'var(--light-red)' },
    { name: 'Blue', value: 'var(--light-blue)' }
  ];

  constructor(
    private validationService: ValidationService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private featureService: FeatureService,
    private featurePreconditionService: FeaturePreConditionService,
    private el: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
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

    this.inputSubscription = this.inputSubject.pipe(debounceTime(1_000)).subscribe(searchTerm => {
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
            .map(row => ({
              ...row,
              answers: row.answers.map(answer => ({
                ...answer,
                backgroundColor: answer.backgroundColor || '#F7F1E6' // default (beige) color - ensures that every row has one
              }))
            }))
            .sort((a, b) => a.answers[0].feature.id - b.answers[0].feature.id || a.answers[0].featurePrecondition.id - b.answers[0].featurePrecondition.id || a.rowId - b.rowId);

          this.fixStakeholderReferences();

          this.mapFeatureRowSpans();

        }

        this.loading = false;
      },
      error => {
         console.error("Error loading validation answers:", error);
         this.loading = false;
        }
    );
  }

  /**
   * Fix stakeholder references by matching answer text to stakeholder objects
   * Workaround for backend serialization issue
   */
  private fixStakeholderReferences(): void {
    let fixCount: number = 0;

    for (const row of this.validationRowValues) {
      for (const answer of row.answers) {
        if (answer.type === ValidationType.STAKEHOLDER) {
          if (answer.answer && answer.answer.trim() !== '') {
            const matchingStakeholder = this.stakeholders.find((s: StakeholderResponse) =>
                s.name === answer.answer || s.id.toString() == answer.answer
            );

            if (matchingStakeholder) {
              answer.stakeholder = matchingStakeholder;
              fixCount++;
            }
          }
        }
      }
    }
  }

  /**
   * Ensure stakeholder consistency across all rows with the same precondition
   */
  ensureStakeholdersConsistency(): void {
    const preconditionGroups = new Map<number, ValidationRow[]>();

    for (const row of this.validationRowValues) {
      if (row.answers.length > 0) {
        const preconditionId = row.answers[0].featurePrecondition.id;
        if (!preconditionGroups.has(preconditionId)) {
          preconditionGroups.set(preconditionId, []);
        }
        preconditionGroups.get(preconditionId)?.push(row);
      }
    }

    for (const [preconditionId, rows] of preconditionGroups.entries()) {
      let stakeholder: StakeholderResponse | undefined;

      for (const row of rows) {
        const stakeholderAnswer = row.answers.find(a => a.type === ValidationType.STAKEHOLDER);
        if (stakeholderAnswer?.stakeholder) {
          stakeholder = stakeholderAnswer.stakeholder;
          break;
        }
      }

      if (stakeholder) {
        for (const row of rows) {
          const stakeholderAnswer = row.answers.find(a => a.type === ValidationType.STAKEHOLDER);
          if (stakeholderAnswer) {
            stakeholderAnswer.stakeholder = stakeholder;
            stakeholderAnswer.answer = stakeholder.name;

            this.validationService.saveValidationAnswer(stakeholderAnswer).subscribe();
          }
        }
      }
    }
  }

  /**
   * Force reapply all stakeholders by simulating stakeholder selection
   */
  forceReapplyAllStakeholders(): void {
    if (!this.validationRowValues.length || !this.validations.length) {
      return;
    }

    const stakeholderValidation = this.validations.find(v => v.type === ValidationType.STAKEHOLDER);
    if (!stakeholderValidation) {
      return;
    }

    // Track which preconditions we've already processed to avoid duplicates
    const processedPreconditions = new Set<number>();

    // Process each row that has a stakeholder
    for (const row of this.validationRowValues) {
      if (row.answers && row.answers.length > 0) {
        const preconditionId = row.answers[0].featurePrecondition.id;

        // Skip if we've already processed this precondition
        if (processedPreconditions.has(preconditionId)) {
          continue;
        }

        // Find stakeholder answer in this row
        const stakeholderAnswer = row.answers.find(a => a.type === ValidationType.STAKEHOLDER);
        if (stakeholderAnswer?.stakeholder) {
          // Simulate stakeholder selection by calling onStakeholderChange
          // This will trigger the propagation to all rows with the same precondition
          this.onStakeholderChange(stakeholderAnswer.stakeholder, stakeholderValidation, row);

          // Mark this precondition as processed
          processedPreconditions.add(preconditionId);
        }
      }
    }
  }

  mapValidationAnswersToRows(validationAnswers: ValidationAnswer[]) {
    const result: { rowId: number; answers: ValidationAnswer[]; }[] = [];

    // First pass: create all rows
    for (const validationAnswer of validationAnswers) {
      const existingRow = result.find(va => va.rowId === validationAnswer.rowId);
      if (existingRow) {
        existingRow.answers.push(validationAnswer);
        continue;
      }
      result.push({rowId: validationAnswer.rowId, answers: [validationAnswer]});
    }

    // Second pass: ensure stakeholders are consistent within preconditions
    const preconditionMap = new Map<number, StakeholderResponse>();

    // First collect all stakeholders by precondition
    for (const row of result) {
      if (row.answers.length > 0) {
        const preconditionId = row.answers[0].featurePrecondition.id;
        const stakeholderAnswer = row.answers.find(a => a.type === ValidationType.STAKEHOLDER);

        if (stakeholderAnswer?.stakeholder && !preconditionMap.has(preconditionId)) {
          preconditionMap.set(preconditionId, stakeholderAnswer.stakeholder);
        }
      }
    }

    // Then ensure all rows with the same precondition have the same stakeholder
    for (const row of result) {
      if (row.answers.length > 0) {
        const preconditionId = row.answers[0].featurePrecondition.id;
        const stakeholder = preconditionMap.get(preconditionId);

        if (stakeholder) {
          const stakeholderAnswer = row.answers.find(a => a.type === ValidationType.STAKEHOLDER);
          if (stakeholderAnswer && !stakeholderAnswer.stakeholder) {
            stakeholderAnswer.stakeholder = stakeholder;
            stakeholderAnswer.answer = stakeholder.name;
          }
        }
      }
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

    // If no stakeholder is provided but we're creating a row with an existing precondition,
    // try to find a stakeholder from any row with the same precondition
    if (!stakeholder && existingPreCondition) {
      // Loop through ALL rows to find any with the same precondition that has a stakeholder
      for (const row of this.validationRowValues) {
        if (row.answers[0].featurePrecondition.id === existingPreCondition.id) {
          const stakeholderAnswer = row.answers.find(a => a.type === ValidationType.STAKEHOLDER);
          if (stakeholderAnswer?.stakeholder) {
            stakeholder = stakeholderAnswer.stakeholder;
            break;
          }
        }
      }
    }

    for (const v of this.validations) {
      const answer = await firstValueFrom(
          this.validationService.saveValidationAnswer({
            id: null,
            rowId: maxRowId + 1,
            validationId: v.id,
            answer: this.getPrefilledValidationRowAnswer(v.type, feature, existingPreCondition, stakeholder),
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

    // Add the new row to the UI immediately
    const newRow = { answers: validationRow, rowId: maxRowId + 1 };
    this.validationRowValues = [...this.validationRowValues, newRow]
        .sort((a, b) =>
            a.answers[0].feature.id - b.answers[0].feature.id ||
            a.answers[0].featurePrecondition.id - b.answers[0].featurePrecondition.id ||
            a.rowId - b.rowId
        );

    this.validationRowValues = this.validationRowValues.sort((a, b) => a.answers[0].feature.id - b.answers[0].feature.id || a.answers[0].featurePrecondition.id - b.answers[0].featurePrecondition.id || a.rowId - b.rowId);

    this.mapFeatureRowSpans();

    // Update precondition related answers
    this.updateRelatedValidationAnswers(<Validation>this.validations.find(v => v.type === ValidationType.FEATURE_PRECONDITION), {answers: validationRow, rowId: maxRowId + 1});

    // Force update of stakeholder-related UI elements
    if (stakeholder) {
      const stakeholderValidation = this.validations.find(v => v.type === ValidationType.STAKEHOLDER);
      if (stakeholderValidation) {
        // Update all rows with the same precondition to have the same stakeholder
        for (let row of this.validationRowValues) {
          if (row.answers[0].featurePrecondition.id === featurePrecondition.id) {
            const stakeholderAnswer = row.answers.find(a => a.type === ValidationType.STAKEHOLDER);
            if (stakeholderAnswer) {
              stakeholderAnswer.stakeholder = stakeholder;
              stakeholderAnswer.answer = stakeholder.name;

              // Force update of the UI by triggering related validation answers update
              this.validationService.saveValidationAnswer(stakeholderAnswer).subscribe(() => {
                if (stakeholderValidation) {
                  this.updateRelatedValidationAnswers(stakeholderValidation, row);
                }
              });
            }
          }
        }
      }
    }

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
      return stakeholder?.name ?? '';
    }
    if (validationType === ValidationType.DO) {
      if (this.translateService.currentLang === GlobalConstants.ET) {
        return 'Kas';
      }
      return 'Do';
    }
    return '';
  }

  getValidationRowAnswer(validation: Validation, validationRowValue: ValidationRow): ValidationAnswer {
    const validationAnswer = validationRowValue.answers.find(a => a.validationId === validation.id);
    if (!validationAnswer) {
      return {} as ValidationAnswer;
    }
    return validationAnswer;
  }

  // Various validation type checking methods
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
            if (validation.type === ValidationType.SELECT) {
              this.checkAndShowPrioritizationNotice(validationRowValue);
            }
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
              answer.answer = eventValue;
            }
            if (validation.type === ValidationType.DO && answer.type === ValidationType.DO) {
              if (this.translateService.currentLang === GlobalConstants.ET) {
                answer.answer = "Kas";
              } else {
                answer.answer = "Do";
              }
            }

            if (validation.type === ValidationType.STAKEHOLDER && answer.type === ValidationType.STAKEHOLDER) {
              answer.stakeholder = validationRowAnswer.stakeholder;
              if (answer.stakeholder) {
                answer.answer = answer.stakeholder.name;
              }
            }

            setTimeout(() => {
              this.validationService.saveValidationAnswer(answer).subscribe(
                  next => {
                    if (validation.type === ValidationType.STAKEHOLDER) {
                      this.updateRelatedValidationAnswers(validation, validationRow);
                    }
                  }
              );
            }, this.TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE);
          }
        }
      }
    }
  }

  updateRelatedValidationAnswers(validation: Validation, validationRowValue: ValidationRow): void {
    const validationsFilledByAnswer = this.validations.filter(foundValidation =>
        foundValidation.validationAutofillList.some(autofill =>
            autofill.validationFilledById !== null && autofill.validationFilledById === validation.id
        )
    );

    if (validation.type === ValidationType.STAKEHOLDER) {
      const stakeholderAnswer = validationRowValue.answers.find(a => a.type === ValidationType.STAKEHOLDER);
      if (stakeholderAnswer?.stakeholder) {
        const preconditionId = validationRowValue.answers[0].featurePrecondition.id;

        for (let row of this.validationRowValues) {
          if (row.rowId !== validationRowValue.rowId &&
              row.answers[0].featurePrecondition.id === preconditionId) {
            const otherStakeholderAnswer = row.answers.find(a => a.type === ValidationType.STAKEHOLDER);
            if (otherStakeholderAnswer) {
              otherStakeholderAnswer.stakeholder = stakeholderAnswer.stakeholder;
              otherStakeholderAnswer.answer = stakeholderAnswer.stakeholder.name;
              this.validationService.saveValidationAnswer(otherStakeholderAnswer).subscribe();
            }
          }
        }
      }
    }

    for (let validationFilledByAnswer of validationsFilledByAnswer) {
      if (validationFilledByAnswer) {
        this.setAutoFillAnswers(validationFilledByAnswer, validationRowValue);
      }
    }
  }

  private setNoExampleAnswer(validationRowValue: ValidationRow) {
    const initialState = {
      title: this.translateService.instant('noExampleModal.title'),
      message: this.translateService.instant('noExampleModal.message'),
      confirmButton: this.translateService.instant('noExampleModal.confirm'),
      cancelButton: this.translateService.instant('noExampleModal.cancel')
    };

    const modalRef = this.modalService.show(NoSituationModalComponent, {
      class: 'modal-box modal-md', initialState
    });

    if (modalRef && modalRef.content) {
      modalRef.content.onClose.subscribe((result: any): void => {
        if (result.confirmed) {
          this.resetExampleAnswers(validationRowValue);
        }
      });
    }
  }

  private resetExampleAnswers(validationRowValue: ValidationRow) {
    let exampleAnswer = '';
    let combinationAnswer = '';

    if (this.isCurrentLangEt) {
      exampleAnswer = 'Näidet pole';
      combinationAnswer = this.validationCombinationResults[this.validationCombinationResults.length-1].resultEt;
    } else {
      exampleAnswer = 'No example';
      combinationAnswer = this.validationCombinationResults[this.validationCombinationResults.length-1].resultEn;
    }

    const exampleValidationAnswer = validationRowValue.answers.find(a => a.type === ValidationType.EXAMPLE);
    const exampleValidation = this.validations.find(v => v.type === ValidationType.EXAMPLE);
    if (exampleValidationAnswer && exampleValidation) {
      this.onValidationRowValueChange(
          exampleAnswer,
          exampleValidationAnswer,
          exampleValidation,
          validationRowValue
      );
    }

    const combinationValidation = this.validations.find(v =>
        v.validationAutofillList.find(vafl => vafl.type === 'COMBINATION')
    );
    const combinationValidationAnswer = validationRowValue.answers.find(a =>
        a.validationId === combinationValidation?.id
    );
    if (combinationValidation && combinationValidationAnswer) {
      this.onValidationRowValueChange(
          combinationAnswer,
          combinationValidationAnswer,
          combinationValidation,
          validationRowValue
      );
    }

    const selectAnswers = validationRowValue.answers.filter(a => a.type === ValidationType.SELECT);
    for (const selectAnswer of selectAnswers) {
      selectAnswer.answer = ValidationValue.CHOOSE_OPTION;
      this.validationService.saveValidationAnswer(selectAnswer).subscribe(
          () => {},
          error => {}
      );
    }
  }

  private setAutoFillAnswers(validationFilledByAnswer: Validation, validationRowValue: ValidationRow) {
    // To verify whether an answer is the default one (CHOOSE_OPTION)
    const requiredAnswers = validationFilledByAnswer.validationAutofillList.map(v =>
        validationRowValue.answers.find(a => a.validationId === v.validationFilledById)
    );
    // allAnswersValid will be true only if every required answer exists, has a value, and is not "CHOOSE_OPTION"
    const allAnswersValid = requiredAnswers.every(a => a && a.answer && a.answer !== 'CHOOSE_OPTION');
    const autofillAnswer = validationRowValue.answers.find(a => a.validationId === validationFilledByAnswer.id);

    // If not all answers are valid, clear the autofill answer and exit
    if (!allAnswersValid) {
      if (autofillAnswer && autofillAnswer.answer !== '') {
        autofillAnswer.answer = '';
        this.validationService.saveValidationAnswer(autofillAnswer).subscribe();
      }
      return;
    }

    /*if (!this.allRequiredAnswersFilled(validationFilledByAnswer, validationRowValue)) {
      return;
    }*/

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
    let foundMatch = false;
    for (let combinationResult of this.validationCombinationResults) {
      if (this.hasMatchingCombination(combinationResult, answerValuesSortedByWeight)) {
        const correctAnswer = validationRowValue.answers.find(a => a.validationId === validationFilledByAnswer.id);
        if (correctAnswer) {
          // Find the stakeholder from the row
          const stakeholderAnswer = validationRowValue.answers.find(a => a.type === ValidationType.STAKEHOLDER);
          const stakeholderName = stakeholderAnswer?.stakeholder?.name || 'Unknown Stakeholder';

          // Append stakeholder to the combined answer - IF you need to debug it
          //correctAnswer.answer = `${this.getTranslation(combinationResult)} (${stakeholderName})`;

          // DONT append the stakeholder
          correctAnswer.answer = this.getTranslation(combinationResult);

          this.validationService.saveValidationAnswer(correctAnswer).subscribe(next => {
            this.updateRelatedValidationAnswers(validationFilledByAnswer, validationRowValue);
          });
        }
        foundMatch = true;
        break;
      }
    }
    // If no matching combination was found (e.g. one or more answers are invalid/default), clear the autofill answer.
    if (!foundMatch) {
      const correctAnswer = validationRowValue.answers.find(a => a.validationId === validationFilledByAnswer.id);
      if (correctAnswer && correctAnswer.answer !== '') {
        correctAnswer.answer = '';
        this.validationService.saveValidationAnswer(correctAnswer).subscribe();
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
    // Finding the precondition ID of the row to delete
    const rowToDelete = this.validationRowValues.find(vrv => vrv.rowId === rowId);
    if (!rowToDelete) return;
    const preconditionId = rowToDelete.answers[0].featurePrecondition.id;

    // Removing rowId from prioritizedRows before actually deleting
    if (this.prioritizedRows[preconditionId]) {
      this.prioritizedRows[preconditionId].delete(String(rowId));

      // It is optional but just in case cleaning up empty sets to avoid memory waste
      if (this.prioritizedRows[preconditionId].size === 0) {
        delete this.prioritizedRows[preconditionId];
      }
    }

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

  mapFeatureRowSpans(): void {
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

  getFillerCellClass(validation: Validation): string {
    if (validation.type === ValidationType.FEATURE) {
      return 'filler-cell-feature';
    }
    return 'filler';
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
    const validationAnswer = this.getValidationRowAnswer(validation, validationRowValue);
    validationAnswer.stakeholder = stakeholder;

    // Update all rows with the same precondition
    const preconditionId = validationRowValue.answers[0].featurePrecondition.id;

    // First update the current row
    this.onValidationRowValueChange(stakeholder ? stakeholder.name : '', validationAnswer, validation, validationRowValue);

    // Then update all other rows with the same precondition
    for (let row of this.validationRowValues) {
      if (row.rowId !== validationRowValue.rowId &&
          row.answers[0].featurePrecondition.id === preconditionId) {
        const stakeholderAnswer = row.answers.find(a => a.type === ValidationType.STAKEHOLDER);
        if (stakeholderAnswer) {
          stakeholderAnswer.stakeholder = stakeholder;
          stakeholderAnswer.answer = stakeholder ? stakeholder.name : '';
          this.validationService.saveValidationAnswer(stakeholderAnswer).subscribe(() => {
            // Force update of related answers
            this.updateRelatedValidationAnswers(validation, row);
          });
        }
      }
    }
  }

  getFormattedSentence(validation: Validation, validationRowValue: ValidationRow): SafeHtml {
    const answer = this.getValidationRowAnswer(validation, validationRowValue)?.answer?.trim();
    let foundStakeholder = this.stakeholders.find(stakeholder =>
        answer.includes(stakeholder.name)
    );
    if (!foundStakeholder) {
      return this.sanitizer.bypassSecurityTrustHtml(answer);
    }

    // Replacing the stakeholder name with a bold version
    const formattedSentence = answer.replace(
        new RegExp(`\\b${foundStakeholder.name}\\b`, 'g'),
        `<strong>${foundStakeholder.name}</strong>`
    );
    return this.sanitizer.bypassSecurityTrustHtml(formattedSentence);
  }

  // Just in case keeping track of the columns which are currently hidden
  hiddenColumns: Set<number> = new Set();
  isColumnHidden(index: number): boolean {
    return this.hiddenColumns.has(index);
  }

  toggleColumnVisibility(index: number) {
    if (this.hiddenColumns.has(index)) {
      this.hiddenColumns.delete(index);
    } else {
      this.hiddenColumns.add(index);
    }
  }

  getRowPreConditionAnswer(validationRow: ValidationRow): ValidationAnswer {
    return <ValidationAnswer>validationRow.answers.find(a => a.type === ValidationType.FEATURE_PRECONDITION);
  }

  getPreconditionActions(validationRowValue: ValidationRow):{name: string, icon: string, onClick: any}[] {
    // Find the stakeholder from the current row
    const stakeholderAnswer = validationRowValue.answers.find(a => a.type === ValidationType.STAKEHOLDER);
    const stakeholder = stakeholderAnswer?.stakeholder;

    return [
      {
        name: "menu.addPrecondition",
        icon: 'add',
        onClick: () => {
          // Pass the stakeholder when adding a new precondition
          this.addValidationRow(validationRowValue.answers[0].feature, undefined, stakeholder);
        }
      },
      {
        name: "menu.deletePrecondition",
        icon: 'delete',
        onClick: () => this.deleteFeaturePreCondition(validationRowValue.answers[0].featurePrecondition.id)
      },
    ];
  }

  getExampleActions(validationRowValue: ValidationRow): {name: string, icon: string, onClick: any}[] {
    // Find the stakeholder answer in the current row
    const stakeholderAnswer = validationRowValue.answers.find(a => a.type === ValidationType.STAKEHOLDER);
    const stakeholder = stakeholderAnswer?.stakeholder;

    // If no stakeholder in current row but we have a precondition, try to find stakeholder from other rows
    let effectiveStakeholder = stakeholder;
    if (!effectiveStakeholder && validationRowValue.answers.length > 0) {
      const preconditionId = validationRowValue.answers[0].featurePrecondition.id;

      // Look for any row with the same precondition that has a stakeholder
      for (const row of this.validationRowValues) {
        if (row.answers[0].featurePrecondition.id === preconditionId && row.rowId !== validationRowValue.rowId) {
          const otherStakeholderAnswer = row.answers.find(a => a.type === ValidationType.STAKEHOLDER);
          if (otherStakeholderAnswer?.stakeholder) {
            effectiveStakeholder = otherStakeholderAnswer.stakeholder;
            break;
          }
        }
      }
    }

    return [
      {
        name: "menu.addExample",
        icon: 'add',
        onClick: () => {
          // Always pass the effective stakeholder when adding a new row
          this.addValidationRow(
              validationRowValue.answers[0].feature,
              this.getRowPreConditionAnswer(validationRowValue).featurePrecondition,
              effectiveStakeholder
          );
        }
      },
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

  onColorChange(event: Event | string, validationRowAnswer: ValidationAnswer): void {
    const newColor = typeof event === 'string' ? event : (event.target as HTMLInputElement).value;

    if (!validationRowAnswer) {
      return;
    }

    validationRowAnswer.backgroundColor = newColor;
    this.validationService.saveValidationAnswer(validationRowAnswer).subscribe()
  }

  toggleColorSelection(rowId: number): void {
    this.showColorSelectionMap[rowId] = !this.showColorSelectionMap[rowId];
  }

  getFeatureActions(validationRowValue: ValidationRow):{name: string, icon: string, onClick: any}[] {
    return [
      {
        name: "menu.deleteFeature",
        icon: 'delete',
        onClick: () => this.deleteFeature(validationRowValue.answers[0].feature.id)
      },
    ];
  }

  // To keep track of which rows are prioritized for each precondition
  prioritizedRows: { [preconditionId: string]: Set<string> } = {};

  // Check if the current row is prioritized
  isPrioritized(validationRowValue: ValidationRow): boolean {
    const preconditionId = validationRowValue.answers[0].featurePrecondition.id;
    //return this.prioritizedRows[preconditionId] === String(validationRowValue.rowId);
    return this.prioritizedRows[preconditionId]?.has(String(validationRowValue.rowId)) ?? false;
  }


  // Check if the current precondition has more than one example
  hasMultipleExamples(preconditionId: number): boolean {
    const rowsWithSamePrecondition = this.validationRowValues.filter(row =>
        row.answers.some(answer => answer.featurePrecondition.id === preconditionId && answer.type === ValidationType.EXAMPLE)
    );
    return rowsWithSamePrecondition.length > 1;
  }

  onCheckboxChange(validationRowValue: ValidationRow): void {
    const preconditionId = validationRowValue.answers[0].featurePrecondition.id;
    const rowId = String(validationRowValue.rowId);

    this.zone.run(() => {
      if (!this.prioritizedRows[preconditionId]) {
        this.prioritizedRows[preconditionId] = new Set<string>();
      }

      const set = this.prioritizedRows[preconditionId];

      if (set.has(rowId)) {
        set.delete(rowId); // Uncheck
      } else {
        set.add(rowId); // Check
      }

      this.cdr.detectChanges();
    });

  }

  isRowDisabled(validationRowValue: ValidationRow): boolean {
    const preconditionId = validationRowValue.answers[0].featurePrecondition.id;
    const prioritizedSet = this.prioritizedRows[preconditionId];

    return prioritizedSet?.size > 0 && !prioritizedSet.has(String(validationRowValue.rowId));
  }

  // Notification state
  showNotification: boolean = false;
  notificationMessage: string = '';
  private notifiedPreconditionIds: Set<number> = new Set<number>();

  checkAndShowPrioritizationNotice(validationRowValue: ValidationRow): void {
    const preconditionId = validationRowValue.answers[0].featurePrecondition.id;

    // Skip if the notice has already been shown for this precondition
    if (this.notifiedPreconditionIds.has(preconditionId)) return;

    // Skip if the notice has already been shown for this precondition
    const exampleRows = this.validationRowValues.filter(row =>
        row.answers.some(a => a.featurePrecondition.id === preconditionId && a.type === ValidationType.EXAMPLE)
    );
    // Check if there are now 2+ examples with 4 dropdowns filled
    if (exampleRows.length >= 2) {
      const allAnswersFilled = exampleRows.every(row =>
          row.answers.filter(a => a.type === ValidationType.SELECT).length === 4 &&
          row.answers.filter(a => a.type === ValidationType.SELECT).every(a => !!a.answer)
      );
      // If valid, show notification and remember this precondition to avoid future duplicates
      if (allAnswersFilled) {
        this.notifiedPreconditionIds.add(preconditionId);
        this.notificationMessage = 'prioritizationNotice.message';
        this.showNotification = true;
      }
    }
  }

  shouldGrayOut(validation: Validation): boolean {
    return this.isValidationExample(validation) ||
        this.isValidationSelectable(validation) ||
        this.isValidationAutofill(validation) ||
        this.isValidationTextField(validation)
  }

}
