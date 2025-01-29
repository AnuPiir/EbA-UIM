import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { ValidationType } from './model/validation';
import { debounceTime, firstValueFrom, Observable, Subject } from 'rxjs';
import { GlobalConstants } from '../constants/global-constants';
import { ValidationValue } from './model/validation-value';
let ValidationComponent = class ValidationComponent {
    constructor(validationService, route, router, translateService, featureService, featurePreconditionService, el) {
        this.validationService = validationService;
        this.route = route;
        this.router = router;
        this.translateService = translateService;
        this.featureService = featureService;
        this.featurePreconditionService = featurePreconditionService;
        this.el = el;
        this.TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE = 400;
        this.loading = true;
        this.translate = false;
        this.validations = [];
        this.validationRowValues = [];
        this.validationCombinationResults = [];
        this.featureRowSpans = [];
        this.featurePreConditionSpans = [];
        this.featuresAlreadyDisplayed = [];
        this.featurePreconditionsAlreadyDisplayed = [];
        this.menuIcon = "arrow_drop_down";
        this.isToggled = false;
        this.colorListToggled = false;
        this.isAddingNewRow = false;
        this.inputSubject = new Subject();
        this.columns = [];
        this.onLanguageChanged();
    }
    onLanguageChanged() {
        this.translateService.onLangChange.subscribe((event) => {
            if (this.router.url.startsWith('/validation')) {
                this.reloadComponent();
            }
        });
    }
    ngAfterContentChecked() {
        var vtextarea = this.el.nativeElement.querySelectorAll('textarea');
        for (let i = 0; i < vtextarea.length; i++) {
            vtextarea[i].style.height = vtextarea[i].scrollHeight + 'px';
        }
    }
    ngOnInit() {
        const questionnaireId = this.route.snapshot.queryParamMap.get('questionnaireId');
        if (!questionnaireId || isNaN(Number(questionnaireId))) {
            this.router.navigate(['questionnaire']);
            return;
        }
        this.questionnaireId = +questionnaireId;
        this.getData();
        this.inputSubscription = this.inputSubject.pipe(debounceTime(300)).subscribe(searchTerm => {
            this.onValidationRowValueChange(searchTerm.inputValue, searchTerm.validationRowAnswer, searchTerm.validation, searchTerm.validationRowValue);
        });
    }
    getData() {
        this.loading = true;
        const finished = new Observable(subscriber => {
            this.getValidations(subscriber);
            this.getValidationCombinationResults(subscriber);
        });
        finished.subscribe(_ => {
            if (this.validations.length > 0 &&
                this.validationCombinationResults.length > 0) {
                this.getValidationAnswers();
            }
        });
    }
    getValidations(subscriber) {
        this.validationService
            .getValidations()
            .subscribe((next) => {
            this.validations = next.sort((a, b) => a.weight - b.weight);
            subscriber.next(this.validations);
        });
    }
    getValidationCombinationResults(subscriber) {
        this.validationService.getValidationCombinationResults().subscribe((next) => {
            this.validationCombinationResults = next;
            subscriber.next(this.validationCombinationResults);
        });
    }
    getValidationAnswers() {
        this.validationService.getValidationAnswersByFeatureGroupId(this.featureGroup.id).subscribe(next => {
            if (next.length === 0) {
                this.addValidationRow();
            }
            else {
                this.validationRowValues = this.mapValidationAnswersToRows(next)
                    .sort((a, b) => a.answers[0].feature.id - b.answers[0].feature.id || a.answers[0].featurePrecondition.id - b.answers[0].featurePrecondition.id || a.rowId - b.rowId);
                this.mapFeatureRowSpans();
            }
            this.loading = false;
        });
    }
    mapValidationAnswersToRows(validationAnswers) {
        const result = [];
        for (const validationAnswer of validationAnswers) {
            const existingRow = result.find(va => va.rowId === validationAnswer.rowId);
            if (existingRow) {
                existingRow.answers.push(validationAnswer);
                continue;
            }
            result.push({ rowId: validationAnswer.rowId, answers: [validationAnswer] });
        }
        return result;
    }
    async addValidationRow(existingFeature, existingPreCondition, stakeholder) {
        this.isAddingNewRow = true;
        let validationRow = [];
        let maxRowId = 0;
        if (this.validationRowValues.length > 0) {
            maxRowId = this.validationRowValues.reduce(function (prev, current) {
                return (prev.rowId > current.rowId) ? prev : current;
            }).rowId;
        }
        const feature = existingFeature ?? await firstValueFrom(this.featureService.create(""));
        const featurePrecondition = existingPreCondition ?? await firstValueFrom(this.featurePreconditionService.create(""));
        for (const v of this.validations) {
            const answer = await firstValueFrom(this.validationService.saveValidationAnswer({
                id: null,
                rowId: maxRowId + 1,
                validationId: v.id,
                answer: this.getPrefilledValidationRowAnswer(v.type, feature, existingPreCondition),
                type: v.type,
                questionnaireId: this.questionnaireId,
                featureGroupId: this.featureGroup.id,
                featurePrecondition: featurePrecondition,
                feature: { answer: feature.answer, id: feature.id, customId: feature.customId },
                stakeholder: stakeholder
            }));
            validationRow.push(answer);
        }
        this.validationRowValues.push({ answers: validationRow, rowId: maxRowId + 1 });
        this.validationRowValues = this.validationRowValues.sort((a, b) => a.answers[0].feature.id - b.answers[0].feature.id || a.answers[0].featurePrecondition.id - b.answers[0].featurePrecondition.id || a.rowId - b.rowId);
        this.mapFeatureRowSpans();
        this.updateRelatedValidationAnswers(this.validations.find(v => v.type === ValidationType.FEATURE_PRECONDITION), { answers: validationRow, rowId: maxRowId + 1 });
        this.isAddingNewRow = false;
    }
    getPrefilledValidationRowAnswer(validationType, featureResponse, featurePreCondition, stakeholder) {
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
    getValidationRowAnswer(validation, validationRowValue) {
        return validationRowValue.answers.filter(answer => answer.validationId === validation.id)[0];
    }
    isValidationSelectable(validation) {
        return validation.type === ValidationType.SELECT;
    }
    isValidationTextField(validation) {
        return validation.type === ValidationType.TEXT;
    }
    isValidationDoField(validation) {
        return validation.type === ValidationType.DO;
    }
    isValidationFeature(validation) {
        return validation.type === ValidationType.FEATURE;
    }
    isValidationAutofill(validation) {
        return validation.type === ValidationType.FILL;
    }
    isValidationStakeholder(validation) {
        return validation.type === ValidationType.STAKEHOLDER;
    }
    isValidationFeaturePrecondition(validation) {
        return validation.type === ValidationType.FEATURE_PRECONDITION;
    }
    isValidationExample(validation) {
        return validation.type === ValidationType.EXAMPLE;
    }
    textAreaValueChange(eventValue, validationRowAnswer, validation, validationRowValue) {
        this.inputSubject.next({
            inputValue: eventValue,
            validationRowAnswer: validationRowAnswer,
            validation: validation,
            validationRowValue: validationRowValue
        });
    }
    async onValidationRowValueChange(eventValue, validationRowAnswer, validation, validationRowValue) {
        validationRowAnswer.answer = eventValue;
        if (validation.type === ValidationType.FEATURE) {
            validationRowAnswer.feature = await firstValueFrom(this.featureService.update(validationRowAnswer.feature.id, eventValue, validationRowAnswer.feature.customId));
        }
        if (validation.type === ValidationType.FEATURE_PRECONDITION) {
            validationRowAnswer.featurePrecondition = await firstValueFrom(this.featurePreconditionService.update(validationRowAnswer.featurePrecondition.id, eventValue));
        }
        this.setRelatedRowSpanAnswers(validation, validationRowAnswer, eventValue);
        setTimeout(() => {
            this.validationService.saveValidationAnswer(validationRowAnswer).subscribe(next => {
                this.updateRelatedValidationAnswers(validation, validationRowValue);
            });
        }, this.TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE);
    }
    setRelatedRowSpanAnswers(validation, validationRowAnswer, eventValue) {
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
                            }
                            else {
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
                            this.validationService.saveValidationAnswer(answer).subscribe(next => {
                            });
                        }, this.TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE);
                    }
                }
                this.updateRelatedValidationAnswers(validation, validationRow);
            }
        }
    }
    updateRelatedValidationAnswers(validation, validationRowValue) {
        const validationsFilledByAnswer = this.validations.filter(foundValidation => foundValidation.validationAutofillList.some(autofill => autofill.validationFilledById !== null && autofill.validationFilledById === validation.id));
        for (let validationFilledByAnswer of validationsFilledByAnswer) {
            if (validationFilledByAnswer) {
                this.setAutoFillAnswers(validationFilledByAnswer, validationRowValue);
            }
        }
    }
    setNoExampleAnswer(validationRowValue) {
        let exampleAnswer = '';
        let combinationAnswer = '';
        if (this.isCurrentLangEt) {
            exampleAnswer = 'Näidet pole';
            combinationAnswer = this.validationCombinationResults[this.validationCombinationResults.length - 1].resultEt;
        }
        else {
            exampleAnswer = 'No example';
            combinationAnswer = this.validationCombinationResults[this.validationCombinationResults.length - 1].resultEn;
        }
        //Example answer
        const exampleValidationAnswer = validationRowValue.answers.find(a => a.type === ValidationType.EXAMPLE);
        const exampleValidation = this.validations.find(v => v.type === ValidationType.EXAMPLE);
        if (exampleValidationAnswer && exampleValidation) {
            this.onValidationRowValueChange(exampleAnswer, exampleValidationAnswer, exampleValidation, validationRowValue);
        }
        //Combination anwer
        const combinationValidation = this.validations.find(v => v.validationAutofillList.find(vafl => vafl.type === 'COMBINATION'));
        const combinationValidationAnswer = validationRowValue.answers.find(a => a.validationId === combinationValidation?.id);
        if (combinationValidation && combinationValidationAnswer) {
            this.onValidationRowValueChange(combinationAnswer, combinationValidationAnswer, combinationValidation, validationRowValue);
        }
    }
    setAutoFillAnswers(validationFilledByAnswer, validationRowValue) {
        if (!this.allRequiredAnswersFilled(validationFilledByAnswer, validationRowValue)) {
            return;
        }
        const answerValues = [];
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
                });
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
            this.validationService.saveValidationAnswer(answerToFill).subscribe(next => { });
        }
    }
    getAnswerToSet(answerValuesSortedByWeight) {
        if (answerValuesSortedByWeight.length > 0) {
            let combinationAnswer = '';
            for (let answerValueSortedByWeight of answerValuesSortedByWeight) {
                combinationAnswer += ' ' + answerValueSortedByWeight.value;
            }
            return combinationAnswer;
        }
        return answerValuesSortedByWeight[0].value;
    }
    allRequiredAnswersFilled(validationFilledByAnswer, validationRowValue) {
        for (let validationFilledBy of validationFilledByAnswer.validationAutofillList) {
            const answer = validationRowValue.answers.find(a => a.validationId === validationFilledBy.validationFilledById);
            if (answer == null || answer.answer == null) {
                return false;
            }
        }
        return true;
    }
    updateCombinationAutoFillAnswers(answerValuesSortedByWeight, validationRowValue, validationFilledByAnswer) {
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
    hasMatchingCombination(combinationResult, answerValuesSortedByWeightOriginal) {
        let answerValuesSortedByWeight = JSON.parse(JSON.stringify(answerValuesSortedByWeightOriginal));
        for (let combination of combinationResult.validationCombinations) {
            const foundAnswer = answerValuesSortedByWeight.find(av => av.validationId == combination.validationResponse.id && av.value == combination.validationValue);
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
    deleteRow(rowId) {
        this.validationService.deleteValidationAnswersByQuestionnaireIdAndRowId(this.questionnaireId, rowId).subscribe(next => {
            this.validationRowValues = this.validationRowValues.filter(vrv => vrv.rowId !== rowId);
            this.reloadComponent();
        });
    }
    getTranslation(value) {
        if (this.isCurrentLangEt) {
            return value.nameEt ? value.nameEt : value.resultEt;
        }
        return value.nameEn ? value.nameEn : value.resultEn;
    }
    get isCurrentLangEt() {
        return this.translateService.currentLang === GlobalConstants.ET;
    }
    mapFeatureRowSpans() {
        const featureRowSpans = [];
        const featurePreConditionRowSpans = [];
        for (let validationRow of this.validationRowValues) {
            for (let validationAnswer of validationRow.answers) {
                if (!featureRowSpans.map(a => a.featureId).includes(validationAnswer.feature.id)) {
                    featureRowSpans.push({ featureId: validationAnswer.feature.id, rowIdsSpanningFeature: [validationAnswer.rowId] });
                }
                else {
                    const featureRowSpan = featureRowSpans.find(o => o.featureId === validationAnswer.feature.id);
                    if (featureRowSpan != null && !featureRowSpan.rowIdsSpanningFeature.includes(validationAnswer.rowId)) {
                        featureRowSpan.rowIdsSpanningFeature.push(validationAnswer.rowId);
                    }
                }
                if (!featurePreConditionRowSpans.map(a => a.featureId).includes(validationAnswer.featurePrecondition.id)) {
                    featurePreConditionRowSpans.push({ featureId: validationAnswer.featurePrecondition.id, rowIdsSpanningFeature: [validationAnswer.rowId] });
                }
                else {
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
    getAnswerRowSpanAndMapAsDisplayed(validation, validationRow) {
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
    isAnswerNotDisplayed(validation, validationRow) {
        if (validation.type === ValidationType.FEATURE) {
            const featureId = validationRow.answers[0].feature.id;
            const existingFeatureToDisplay = this.featuresAlreadyDisplayed.find(f => f.featureId === featureId);
            if (!existingFeatureToDisplay) {
                this.featuresAlreadyDisplayed.push({ featureId: featureId, rowIdToDisplayOn: validationRow.rowId });
                return true;
            }
            return existingFeatureToDisplay?.rowIdToDisplayOn === validationRow.rowId;
        }
        if (validation.type === ValidationType.FEATURE_PRECONDITION) {
            const featureId = validationRow.answers[0].featurePrecondition.id;
            const existingFeaturePreconditionToDisplay = this.featurePreconditionsAlreadyDisplayed.find(f => f.featureId === featureId);
            if (!existingFeaturePreconditionToDisplay) {
                this.featurePreconditionsAlreadyDisplayed.push({ featureId: featureId, rowIdToDisplayOn: validationRow.rowId });
                return true;
            }
            return existingFeaturePreconditionToDisplay?.rowIdToDisplayOn === validationRow.rowId;
        }
        if (validation.type === ValidationType.STAKEHOLDER || validation.type === ValidationType.DO) {
            const featureId = validationRow.answers[0].featurePrecondition.id;
            const existingFeaturePreconditionToDisplay = this.featurePreconditionsAlreadyDisplayed.find(f => f.featureId === featureId);
            if (!existingFeaturePreconditionToDisplay) {
                return true;
            }
            return existingFeaturePreconditionToDisplay?.rowIdToDisplayOn === validationRow.rowId;
        }
        return true;
    }
    getStickyClassByIndex(i, isHeader) {
        if (i === 0) {
            return 'content-cell-first-child';
        }
        else if (i === 1) {
            return 'content-cell-second-child';
        }
        else if (i === 2) {
            return 'content-cell-third-child';
        }
        else if (i === 3) {
            return 'content-cell-fourth-child';
        }
        else if (i === 4) {
            return 'content-cell-fifth-child';
        }
        else if (i > 4 && i < 9) {
            return 'content-cell-four-options';
        }
        else if (i === 9) {
            return 'content-cell-tenth-child';
        }
        else if (i === 10) {
            if (isHeader) {
                return 'content-header-eleventh-child';
            }
            return 'content-cell-eleventh-child';
        }
        else if (i === 11) {
            return 'content-cell-twelveth-child';
        }
        else if (i === 12) {
            return 'content-cell-thirteenth-child';
        }
        else if (i === 13) {
            return 'content-cell-fourteenth-child';
        }
        else if (i === 14) {
            return 'content-cell-fifteenth-child';
        }
        return '';
    }
    onStakeholderChange(stakeholder, validation, validationRowValue) {
        const validationAnswer = this.getValidationRowAnswer(validation, validationRowValue);
        validationAnswer.stakeholder = stakeholder;
        this.onValidationRowValueChange(stakeholder ? stakeholder.name : '', validationAnswer, validation, validationRowValue);
    }
    getRowPreConditionAnswer(validationRow) {
        return validationRow.answers.find(a => a.type === ValidationType.FEATURE_PRECONDITION);
    }
    getFeatureActions(validationRowValue) {
        return [
            { name: "menu.deleteFeature", icon: 'delete', onClick: () => this.deleteFeature(validationRowValue.answers[0].feature.id) },
        ];
    }
    getPreconditionActions(validationRowValue) {
        return [
            { name: "menu.addPrecondition", icon: 'add', onClick: () => this.addValidationRow(validationRowValue.answers[0].feature) },
            { name: "menu.deletePrecondition", icon: 'delete', onClick: () => this.deleteFeaturePreCondition(validationRowValue.answers[0].featurePrecondition.id) },
        ];
    }
    getExampleActions(validationRowValue) {
        return [
            { name: "menu.addExample", icon: 'add', onClick: () => this.addValidationRow(validationRowValue.answers[0].feature, this.getRowPreConditionAnswer(validationRowValue).featurePrecondition, validationRowValue.answers[0].stakeholder) },
            { name: "menu.deleteExample", icon: 'delete', onClick: () => this.deleteRow(validationRowValue.rowId) },
            { name: "menu.noExample", icon: 'cancel', onClick: () => this.setNoExampleAnswer(validationRowValue) }
        ];
    }
    deleteFeature(id) {
        this.featureService.delete(id).subscribe(next => this.reloadComponent());
    }
    deleteFeaturePreCondition(id) {
        this.featurePreconditionService.delete(id).subscribe(next => this.reloadComponent());
    }
    reloadComponent() {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['validation'], { queryParams: { questionnaireId: this.questionnaireId, tabIndex: this.tabIndex } }).then(() => {
            });
        });
    }
    getStakeholderColorClass(answer, column) {
        if (answer !== null && (column == 2 || column == 11)) {
            let currentStakeholder = answer.trim();
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
    getStakeHolderAction(validation, validationRowValue) {
        return (stakeHolder) => this.onStakeholderChange(stakeHolder, validation, validationRowValue);
    }
    getStakeHolderMenuAction(validationRowValue) {
        const validationForStakeHolder = this.validations.find(v => v.type === ValidationType.STAKEHOLDER);
        if (validationForStakeHolder) {
            return this.getStakeHolderAction(validationForStakeHolder, validationRowValue);
        }
    }
    onFeatureCustomIdChange(customId, feature) {
        setTimeout(() => {
            this.featureService.update(feature.id, feature.answer, customId).subscribe(next => { });
        }, this.TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE);
    }
    autoGrow(event) {
        const element = event.target;
        element.style.height = '5px';
        element.style.height = (element.scrollHeight) + 'px';
    }
    getValidationValue(answer) {
        return ValidationValue[answer];
    }
};
__decorate([
    ViewChild('PreconditionMenu')
], ValidationComponent.prototype, "menuComponent", void 0);
__decorate([
    Input()
], ValidationComponent.prototype, "tabIndex", void 0);
__decorate([
    Input()
], ValidationComponent.prototype, "columns", void 0);
__decorate([
    Input()
], ValidationComponent.prototype, "featureGroup", void 0);
__decorate([
    Input()
], ValidationComponent.prototype, "stakeholders", void 0);
ValidationComponent = __decorate([
    Component({
        selector: 'app-validation',
        templateUrl: './validation.component.html',
        styleUrls: ['./validation.component.css']
    })
], ValidationComponent);
export { ValidationComponent };
//# sourceMappingURL=validation.component.js.map