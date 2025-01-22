"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationComponent = void 0;
var core_1 = require("@angular/core");
var validation_1 = require("./model/validation");
var rxjs_1 = require("rxjs");
var global_constants_1 = require("../constants/global-constants");
var validation_value_1 = require("./model/validation-value");
var ValidationComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-validation',
            templateUrl: './validation.component.html',
            styleUrls: ['./validation.component.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _menuComponent_decorators;
    var _menuComponent_initializers = [];
    var _menuComponent_extraInitializers = [];
    var _tabIndex_decorators;
    var _tabIndex_initializers = [];
    var _tabIndex_extraInitializers = [];
    var _columns_decorators;
    var _columns_initializers = [];
    var _columns_extraInitializers = [];
    var _featureGroup_decorators;
    var _featureGroup_initializers = [];
    var _featureGroup_extraInitializers = [];
    var _stakeholders_decorators;
    var _stakeholders_initializers = [];
    var _stakeholders_extraInitializers = [];
    var ValidationComponent = _classThis = /** @class */ (function () {
        function ValidationComponent_1(validationService, route, router, translateService, featureService, featurePreconditionService, el) {
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
            this.inputSubject = new rxjs_1.Subject();
            this.menuComponent = __runInitializers(this, _menuComponent_initializers, void 0);
            this.tabIndex = (__runInitializers(this, _menuComponent_extraInitializers), __runInitializers(this, _tabIndex_initializers, void 0));
            this.columns = (__runInitializers(this, _tabIndex_extraInitializers), __runInitializers(this, _columns_initializers, []));
            this.featureGroup = (__runInitializers(this, _columns_extraInitializers), __runInitializers(this, _featureGroup_initializers, void 0));
            this.stakeholders = (__runInitializers(this, _featureGroup_extraInitializers), __runInitializers(this, _stakeholders_initializers, void 0));
            this.MenuComponent = __runInitializers(this, _stakeholders_extraInitializers);
            this.onLanguageChanged();
        }
        ValidationComponent_1.prototype.onLanguageChanged = function () {
            var _this = this;
            this.translateService.onLangChange.subscribe(function (event) {
                if (_this.router.url.startsWith('/validation')) {
                    _this.reloadComponent();
                }
            });
        };
        ValidationComponent_1.prototype.ngAfterContentChecked = function () {
            var vtextarea = this.el.nativeElement.querySelectorAll('textarea');
            for (var i = 0; i < vtextarea.length; i++) {
                vtextarea[i].style.height = vtextarea[i].scrollHeight + 'px';
            }
        };
        ValidationComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            var questionnaireId = this.route.snapshot.queryParamMap.get('questionnaireId');
            if (!questionnaireId || isNaN(Number(questionnaireId))) {
                this.router.navigate(['questionnaire']);
                return;
            }
            this.questionnaireId = +questionnaireId;
            this.getData();
            this.inputSubscription = this.inputSubject.pipe((0, rxjs_1.debounceTime)(300)).subscribe(function (searchTerm) {
                _this.onValidationRowValueChange(searchTerm.inputValue, searchTerm.validationRowAnswer, searchTerm.validation, searchTerm.validationRowValue);
            });
        };
        ValidationComponent_1.prototype.getData = function () {
            var _this = this;
            this.loading = true;
            var finished = new rxjs_1.Observable(function (subscriber) {
                _this.getValidations(subscriber);
                _this.getValidationCombinationResults(subscriber);
            });
            finished.subscribe(function (_) {
                if (_this.validations.length > 0 &&
                    _this.validationCombinationResults.length > 0) {
                    _this.getValidationAnswers();
                }
            });
        };
        ValidationComponent_1.prototype.getValidations = function (subscriber) {
            var _this = this;
            this.validationService
                .getValidations()
                .subscribe(function (next) {
                _this.validations = next.sort(function (a, b) { return a.weight - b.weight; });
                subscriber.next(_this.validations);
            });
        };
        ValidationComponent_1.prototype.getValidationCombinationResults = function (subscriber) {
            var _this = this;
            this.validationService.getValidationCombinationResults().subscribe(function (next) {
                _this.validationCombinationResults = next;
                subscriber.next(_this.validationCombinationResults);
            });
        };
        ValidationComponent_1.prototype.getValidationAnswers = function () {
            var _this = this;
            this.validationService.getValidationAnswersByFeatureGroupId(this.featureGroup.id).subscribe(function (next) {
                if (next.length === 0) {
                    _this.addValidationRow();
                }
                else {
                    _this.validationRowValues = _this.mapValidationAnswersToRows(next)
                        .sort(function (a, b) { return a.answers[0].feature.id - b.answers[0].feature.id || a.answers[0].featurePrecondition.id - b.answers[0].featurePrecondition.id || a.rowId - b.rowId; });
                    _this.mapFeatureRowSpans();
                }
                _this.loading = false;
            });
        };
        ValidationComponent_1.prototype.mapValidationAnswersToRows = function (validationAnswers) {
            var result = [];
            var _loop_1 = function (validationAnswer) {
                var existingRow = result.find(function (va) { return va.rowId === validationAnswer.rowId; });
                if (existingRow) {
                    existingRow.answers.push(validationAnswer);
                    return "continue";
                }
                result.push({ rowId: validationAnswer.rowId, answers: [validationAnswer] });
            };
            for (var _i = 0, validationAnswers_1 = validationAnswers; _i < validationAnswers_1.length; _i++) {
                var validationAnswer = validationAnswers_1[_i];
                _loop_1(validationAnswer);
            }
            return result;
        };
        ValidationComponent_1.prototype.addValidationRow = function (existingFeature, existingPreCondition, stakeholder) {
            return __awaiter(this, void 0, void 0, function () {
                var validationRow, maxRowId, feature, _a, featurePrecondition, _b, _i, _c, v, answer;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            this.isAddingNewRow = true;
                            validationRow = [];
                            maxRowId = 0;
                            if (this.validationRowValues.length > 0) {
                                maxRowId = this.validationRowValues.reduce(function (prev, current) {
                                    return (prev.rowId > current.rowId) ? prev : current;
                                }).rowId;
                            }
                            if (!(existingFeature !== null && existingFeature !== void 0)) return [3 /*break*/, 1];
                            _a = existingFeature;
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.featureService.create(""))];
                        case 2:
                            _a = _d.sent();
                            _d.label = 3;
                        case 3:
                            feature = _a;
                            if (!(existingPreCondition !== null && existingPreCondition !== void 0)) return [3 /*break*/, 4];
                            _b = existingPreCondition;
                            return [3 /*break*/, 6];
                        case 4: return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.featurePreconditionService.create(""))];
                        case 5:
                            _b = _d.sent();
                            _d.label = 6;
                        case 6:
                            featurePrecondition = _b;
                            _i = 0, _c = this.validations;
                            _d.label = 7;
                        case 7:
                            if (!(_i < _c.length)) return [3 /*break*/, 10];
                            v = _c[_i];
                            return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.validationService.saveValidationAnswer({
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
                                }))];
                        case 8:
                            answer = _d.sent();
                            validationRow.push(answer);
                            _d.label = 9;
                        case 9:
                            _i++;
                            return [3 /*break*/, 7];
                        case 10:
                            this.validationRowValues.push({ answers: validationRow, rowId: maxRowId + 1 });
                            this.validationRowValues = this.validationRowValues.sort(function (a, b) { return a.answers[0].feature.id - b.answers[0].feature.id || a.answers[0].featurePrecondition.id - b.answers[0].featurePrecondition.id || a.rowId - b.rowId; });
                            this.mapFeatureRowSpans();
                            this.updateRelatedValidationAnswers(this.validations.find(function (v) { return v.type === validation_1.ValidationType.FEATURE_PRECONDITION; }), { answers: validationRow, rowId: maxRowId + 1 });
                            this.isAddingNewRow = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        ValidationComponent_1.prototype.getPrefilledValidationRowAnswer = function (validationType, featureResponse, featurePreCondition, stakeholder) {
            if (validationType === validation_1.ValidationType.FEATURE_PRECONDITION) {
                return (featurePreCondition === null || featurePreCondition === void 0 ? void 0 : featurePreCondition.answer) ? featurePreCondition.answer : '';
            }
            if (validationType === validation_1.ValidationType.FEATURE) {
                return (featureResponse === null || featureResponse === void 0 ? void 0 : featureResponse.answer) ? featureResponse.answer : '';
            }
            if (validationType === validation_1.ValidationType.STAKEHOLDER) {
                return (stakeholder === null || stakeholder === void 0 ? void 0 : stakeholder.name) ? stakeholder.name : '';
            }
            if (validationType === validation_1.ValidationType.DO) {
                if (this.translateService.currentLang === global_constants_1.GlobalConstants.ET) {
                    return 'Kas';
                }
                return 'Do';
            }
            return '';
        };
        ValidationComponent_1.prototype.getValidationRowAnswer = function (validation, validationRowValue) {
            return validationRowValue.answers.filter(function (answer) { return answer.validationId === validation.id; })[0];
        };
        ValidationComponent_1.prototype.isValidationSelectable = function (validation) {
            return validation.type === validation_1.ValidationType.SELECT;
        };
        ValidationComponent_1.prototype.isValidationTextField = function (validation) {
            return validation.type === validation_1.ValidationType.TEXT;
        };
        ValidationComponent_1.prototype.isValidationDoField = function (validation) {
            return validation.type === validation_1.ValidationType.DO;
        };
        ValidationComponent_1.prototype.isValidationFeature = function (validation) {
            return validation.type === validation_1.ValidationType.FEATURE;
        };
        ValidationComponent_1.prototype.isValidationAutofill = function (validation) {
            return validation.type === validation_1.ValidationType.FILL;
        };
        ValidationComponent_1.prototype.isValidationStakeholder = function (validation) {
            return validation.type === validation_1.ValidationType.STAKEHOLDER;
        };
        ValidationComponent_1.prototype.isValidationFeaturePrecondition = function (validation) {
            return validation.type === validation_1.ValidationType.FEATURE_PRECONDITION;
        };
        ValidationComponent_1.prototype.isValidationExample = function (validation) {
            return validation.type === validation_1.ValidationType.EXAMPLE;
        };
        ValidationComponent_1.prototype.textAreaValueChange = function (eventValue, validationRowAnswer, validation, validationRowValue) {
            this.inputSubject.next({
                inputValue: eventValue,
                validationRowAnswer: validationRowAnswer,
                validation: validation,
                validationRowValue: validationRowValue
            });
        };
        ValidationComponent_1.prototype.onValidationRowValueChange = function (eventValue, validationRowAnswer, validation, validationRowValue) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            validationRowAnswer.answer = eventValue;
                            if (!(validation.type === validation_1.ValidationType.FEATURE)) return [3 /*break*/, 2];
                            _a = validationRowAnswer;
                            return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.featureService.update(validationRowAnswer.feature.id, eventValue, validationRowAnswer.feature.customId))];
                        case 1:
                            _a.feature = _c.sent();
                            _c.label = 2;
                        case 2:
                            if (!(validation.type === validation_1.ValidationType.FEATURE_PRECONDITION)) return [3 /*break*/, 4];
                            _b = validationRowAnswer;
                            return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.featurePreconditionService.update(validationRowAnswer.featurePrecondition.id, eventValue))];
                        case 3:
                            _b.featurePrecondition = _c.sent();
                            _c.label = 4;
                        case 4:
                            this.setRelatedRowSpanAnswers(validation, validationRowAnswer, eventValue);
                            setTimeout(function () {
                                _this.validationService.saveValidationAnswer(validationRowAnswer).subscribe(function (next) {
                                    _this.updateRelatedValidationAnswers(validation, validationRowValue);
                                });
                            }, this.TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE);
                            return [2 /*return*/];
                    }
                });
            });
        };
        ValidationComponent_1.prototype.setRelatedRowSpanAnswers = function (validation, validationRowAnswer, eventValue) {
            var _this = this;
            if ([validation_1.ValidationType.DO, validation_1.ValidationType.FEATURE_PRECONDITION, validation_1.ValidationType.STAKEHOLDER].includes(validation.type)) {
                for (var _i = 0, _a = this.validationRowValues; _i < _a.length; _i++) {
                    var validationRow = _a[_i];
                    var _loop_2 = function (answer) {
                        if (answer.featurePrecondition.id === validationRowAnswer.featurePrecondition.id && answer.id !== validationRowAnswer.id) {
                            if (validation.type === validation_1.ValidationType.FEATURE_PRECONDITION && answer.type === validation_1.ValidationType.FEATURE_PRECONDITION) {
                                answer.answer = eventValue;
                            }
                            if (validation.type === validation_1.ValidationType.DO && answer.type === validation_1.ValidationType.DO) {
                                if (this_1.translateService.currentLang === global_constants_1.GlobalConstants.ET) {
                                    answer.answer = "Kas";
                                }
                                else {
                                    answer.answer = "Do";
                                }
                            }
                            if (validation.type === validation_1.ValidationType.STAKEHOLDER && answer.type === validation_1.ValidationType.STAKEHOLDER) {
                                answer.stakeholder = validationRowAnswer.stakeholder;
                                if (answer.stakeholder) {
                                    answer.answer = answer.stakeholder.name;
                                }
                            }
                            setTimeout(function () {
                                _this.validationService.saveValidationAnswer(answer).subscribe(function (next) {
                                });
                            }, this_1.TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE);
                        }
                    };
                    var this_1 = this;
                    for (var _b = 0, _c = validationRow.answers; _b < _c.length; _b++) {
                        var answer = _c[_b];
                        _loop_2(answer);
                    }
                    this.updateRelatedValidationAnswers(validation, validationRow);
                }
            }
        };
        ValidationComponent_1.prototype.updateRelatedValidationAnswers = function (validation, validationRowValue) {
            var validationsFilledByAnswer = this.validations.filter(function (foundValidation) {
                return foundValidation.validationAutofillList.some(function (autofill) {
                    return autofill.validationFilledById !== null && autofill.validationFilledById === validation.id;
                });
            });
            for (var _i = 0, validationsFilledByAnswer_1 = validationsFilledByAnswer; _i < validationsFilledByAnswer_1.length; _i++) {
                var validationFilledByAnswer = validationsFilledByAnswer_1[_i];
                if (validationFilledByAnswer) {
                    this.setAutoFillAnswers(validationFilledByAnswer, validationRowValue);
                }
            }
        };
        ValidationComponent_1.prototype.setNoExampleAnswer = function (validationRowValue) {
            var exampleAnswer = '';
            var combinationAnswer = '';
            if (this.isCurrentLangEt) {
                exampleAnswer = 'Näidet pole';
                combinationAnswer = this.validationCombinationResults[this.validationCombinationResults.length - 1].resultEt;
            }
            else {
                exampleAnswer = 'No example';
                combinationAnswer = this.validationCombinationResults[this.validationCombinationResults.length - 1].resultEn;
            }
            //Example answer
            var exampleValidationAnswer = validationRowValue.answers.find(function (a) { return a.type === validation_1.ValidationType.EXAMPLE; });
            var exampleValidation = this.validations.find(function (v) { return v.type === validation_1.ValidationType.EXAMPLE; });
            if (exampleValidationAnswer && exampleValidation) {
                this.onValidationRowValueChange(exampleAnswer, exampleValidationAnswer, exampleValidation, validationRowValue);
            }
            //Combination anwer
            var combinationValidation = this.validations.find(function (v) { return v.validationAutofillList.find(function (vafl) { return vafl.type === 'COMBINATION'; }); });
            var combinationValidationAnswer = validationRowValue.answers.find(function (a) { return a.validationId === (combinationValidation === null || combinationValidation === void 0 ? void 0 : combinationValidation.id); });
            if (combinationValidation && combinationValidationAnswer) {
                this.onValidationRowValueChange(combinationAnswer, combinationValidationAnswer, combinationValidation, validationRowValue);
            }
        };
        ValidationComponent_1.prototype.setAutoFillAnswers = function (validationFilledByAnswer, validationRowValue) {
            if (!this.allRequiredAnswersFilled(validationFilledByAnswer, validationRowValue)) {
                return;
            }
            var answerValues = [];
            var isAutofillTypeCombination = true;
            var isAutoFillFromSelect = true;
            var _loop_3 = function (validationFilledBy) {
                if (validationFilledBy.type !== 'COMBINATION') {
                    isAutofillTypeCombination = false;
                }
                var answer = validationRowValue.answers.find(function (a) { return a.validationId === validationFilledBy.validationFilledById; });
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
            };
            for (var _i = 0, _a = validationFilledByAnswer.validationAutofillList; _i < _a.length; _i++) {
                var validationFilledBy = _a[_i];
                _loop_3(validationFilledBy);
            }
            var answerValuesSortedByWeight = answerValues.sort(function (_a, _b) {
                var a = _a.weight;
                var b = _b.weight;
                return a - b;
            });
            if (isAutofillTypeCombination && isAutoFillFromSelect) {
                this.updateCombinationAutoFillAnswers(answerValuesSortedByWeight, validationRowValue, validationFilledByAnswer);
                return;
            }
            var answerToFill = validationRowValue.answers.find(function (a) { return a.validationId === validationFilledByAnswer.id; });
            if (answerToFill) {
                answerToFill.answer = this.getAnswerToSet(answerValuesSortedByWeight);
                this.validationService.saveValidationAnswer(answerToFill).subscribe(function (next) { });
            }
        };
        ValidationComponent_1.prototype.getAnswerToSet = function (answerValuesSortedByWeight) {
            if (answerValuesSortedByWeight.length > 0) {
                var combinationAnswer = '';
                for (var _i = 0, answerValuesSortedByWeight_1 = answerValuesSortedByWeight; _i < answerValuesSortedByWeight_1.length; _i++) {
                    var answerValueSortedByWeight = answerValuesSortedByWeight_1[_i];
                    combinationAnswer += ' ' + answerValueSortedByWeight.value;
                }
                return combinationAnswer;
            }
            return answerValuesSortedByWeight[0].value;
        };
        ValidationComponent_1.prototype.allRequiredAnswersFilled = function (validationFilledByAnswer, validationRowValue) {
            var _loop_4 = function (validationFilledBy) {
                var answer = validationRowValue.answers.find(function (a) { return a.validationId === validationFilledBy.validationFilledById; });
                if (answer == null || answer.answer == null) {
                    return { value: false };
                }
            };
            for (var _i = 0, _a = validationFilledByAnswer.validationAutofillList; _i < _a.length; _i++) {
                var validationFilledBy = _a[_i];
                var state_1 = _loop_4(validationFilledBy);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return true;
        };
        ValidationComponent_1.prototype.updateCombinationAutoFillAnswers = function (answerValuesSortedByWeight, validationRowValue, validationFilledByAnswer) {
            var _this = this;
            for (var _i = 0, _a = this.validationCombinationResults; _i < _a.length; _i++) {
                var combinationResult = _a[_i];
                if (this.hasMatchingCombination(combinationResult, answerValuesSortedByWeight)) {
                    var correctAnswer = validationRowValue.answers.find(function (a) { return a.validationId === validationFilledByAnswer.id; });
                    if (correctAnswer) {
                        correctAnswer.answer = this.getTranslation(combinationResult);
                        this.validationService.saveValidationAnswer(correctAnswer).subscribe(function (next) {
                            _this.updateRelatedValidationAnswers(validationFilledByAnswer, validationRowValue);
                        });
                    }
                    return;
                }
            }
        };
        ValidationComponent_1.prototype.hasMatchingCombination = function (combinationResult, answerValuesSortedByWeightOriginal) {
            var answerValuesSortedByWeight = JSON.parse(JSON.stringify(answerValuesSortedByWeightOriginal));
            var _loop_5 = function (combination) {
                var foundAnswer = answerValuesSortedByWeight.find(function (av) { return av.validationId == combination.validationResponse.id && av.value == combination.validationValue; });
                if (foundAnswer) {
                    foundAnswer.hasMatch = true;
                }
            };
            for (var _i = 0, _a = combinationResult.validationCombinations; _i < _a.length; _i++) {
                var combination = _a[_i];
                _loop_5(combination);
            }
            var hasMatch = true;
            for (var _b = 0, answerValuesSortedByWeight_2 = answerValuesSortedByWeight; _b < answerValuesSortedByWeight_2.length; _b++) {
                var answerValue = answerValuesSortedByWeight_2[_b];
                if (!answerValue.hasMatch) {
                    hasMatch = false;
                }
            }
            return hasMatch;
        };
        ValidationComponent_1.prototype.deleteRow = function (rowId) {
            var _this = this;
            this.validationService.deleteValidationAnswersByQuestionnaireIdAndRowId(this.questionnaireId, rowId).subscribe(function (next) {
                _this.validationRowValues = _this.validationRowValues.filter(function (vrv) { return vrv.rowId !== rowId; });
                _this.reloadComponent();
            });
        };
        ValidationComponent_1.prototype.getTranslation = function (value) {
            if (this.isCurrentLangEt) {
                return value.nameEt ? value.nameEt : value.resultEt;
            }
            return value.nameEn ? value.nameEn : value.resultEn;
        };
        Object.defineProperty(ValidationComponent_1.prototype, "isCurrentLangEt", {
            get: function () {
                return this.translateService.currentLang === global_constants_1.GlobalConstants.ET;
            },
            enumerable: false,
            configurable: true
        });
        ValidationComponent_1.prototype.mapFeatureRowSpans = function () {
            var featureRowSpans = [];
            var featurePreConditionRowSpans = [];
            for (var _i = 0, _a = this.validationRowValues; _i < _a.length; _i++) {
                var validationRow = _a[_i];
                var _loop_6 = function (validationAnswer) {
                    if (!featureRowSpans.map(function (a) { return a.featureId; }).includes(validationAnswer.feature.id)) {
                        featureRowSpans.push({ featureId: validationAnswer.feature.id, rowIdsSpanningFeature: [validationAnswer.rowId] });
                    }
                    else {
                        var featureRowSpan = featureRowSpans.find(function (o) { return o.featureId === validationAnswer.feature.id; });
                        if (featureRowSpan != null && !featureRowSpan.rowIdsSpanningFeature.includes(validationAnswer.rowId)) {
                            featureRowSpan.rowIdsSpanningFeature.push(validationAnswer.rowId);
                        }
                    }
                    if (!featurePreConditionRowSpans.map(function (a) { return a.featureId; }).includes(validationAnswer.featurePrecondition.id)) {
                        featurePreConditionRowSpans.push({ featureId: validationAnswer.featurePrecondition.id, rowIdsSpanningFeature: [validationAnswer.rowId] });
                    }
                    else {
                        var featureRowSpan = featurePreConditionRowSpans.find(function (o) { return o.featureId === validationAnswer.featurePrecondition.id; });
                        if (featureRowSpan != null && !featureRowSpan.rowIdsSpanningFeature.includes(validationAnswer.rowId)) {
                            featureRowSpan.rowIdsSpanningFeature.push(validationAnswer.rowId);
                        }
                    }
                };
                for (var _b = 0, _c = validationRow.answers; _b < _c.length; _b++) {
                    var validationAnswer = _c[_b];
                    _loop_6(validationAnswer);
                }
            }
            this.featurePreConditionSpans = featurePreConditionRowSpans;
            this.featureRowSpans = featureRowSpans;
        };
        ValidationComponent_1.prototype.getAnswerRowSpanAndMapAsDisplayed = function (validation, validationRow) {
            var _a, _b, _c, _d;
            if (validation.type === validation_1.ValidationType.FEATURE) {
                var featureId_1 = validationRow.answers[0].feature.id;
                return (_b = (_a = this.featureRowSpans.find(function (a) { return a.featureId === featureId_1; })) === null || _a === void 0 ? void 0 : _a.rowIdsSpanningFeature.length) !== null && _b !== void 0 ? _b : 1;
            }
            if (validation.type === validation_1.ValidationType.FEATURE_PRECONDITION || validation.type === validation_1.ValidationType.STAKEHOLDER || validation.type === validation_1.ValidationType.DO) {
                var featureId_2 = validationRow.answers[0].featurePrecondition.id;
                return (_d = (_c = this.featurePreConditionSpans.find(function (a) { return a.featureId === featureId_2; })) === null || _c === void 0 ? void 0 : _c.rowIdsSpanningFeature.length) !== null && _d !== void 0 ? _d : 1;
            }
            return 1;
        };
        ValidationComponent_1.prototype.isAnswerNotDisplayed = function (validation, validationRow) {
            if (validation.type === validation_1.ValidationType.FEATURE) {
                var featureId_3 = validationRow.answers[0].feature.id;
                var existingFeatureToDisplay = this.featuresAlreadyDisplayed.find(function (f) { return f.featureId === featureId_3; });
                if (!existingFeatureToDisplay) {
                    this.featuresAlreadyDisplayed.push({ featureId: featureId_3, rowIdToDisplayOn: validationRow.rowId });
                    return true;
                }
                return (existingFeatureToDisplay === null || existingFeatureToDisplay === void 0 ? void 0 : existingFeatureToDisplay.rowIdToDisplayOn) === validationRow.rowId;
            }
            if (validation.type === validation_1.ValidationType.FEATURE_PRECONDITION) {
                var featureId_4 = validationRow.answers[0].featurePrecondition.id;
                var existingFeaturePreconditionToDisplay = this.featurePreconditionsAlreadyDisplayed.find(function (f) { return f.featureId === featureId_4; });
                if (!existingFeaturePreconditionToDisplay) {
                    this.featurePreconditionsAlreadyDisplayed.push({ featureId: featureId_4, rowIdToDisplayOn: validationRow.rowId });
                    return true;
                }
                return (existingFeaturePreconditionToDisplay === null || existingFeaturePreconditionToDisplay === void 0 ? void 0 : existingFeaturePreconditionToDisplay.rowIdToDisplayOn) === validationRow.rowId;
            }
            if (validation.type === validation_1.ValidationType.STAKEHOLDER || validation.type === validation_1.ValidationType.DO) {
                var featureId_5 = validationRow.answers[0].featurePrecondition.id;
                var existingFeaturePreconditionToDisplay = this.featurePreconditionsAlreadyDisplayed.find(function (f) { return f.featureId === featureId_5; });
                if (!existingFeaturePreconditionToDisplay) {
                    return true;
                }
                return (existingFeaturePreconditionToDisplay === null || existingFeaturePreconditionToDisplay === void 0 ? void 0 : existingFeaturePreconditionToDisplay.rowIdToDisplayOn) === validationRow.rowId;
            }
            return true;
        };
        ValidationComponent_1.prototype.getStickyClassByIndex = function (i, isHeader) {
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
        };
        ValidationComponent_1.prototype.onStakeholderChange = function (stakeholder, validation, validationRowValue) {
            var validationAnswer = this.getValidationRowAnswer(validation, validationRowValue);
            validationAnswer.stakeholder = stakeholder;
            this.onValidationRowValueChange(stakeholder ? stakeholder.name : '', validationAnswer, validation, validationRowValue);
        };
        ValidationComponent_1.prototype.getRowPreConditionAnswer = function (validationRow) {
            return validationRow.answers.find(function (a) { return a.type === validation_1.ValidationType.FEATURE_PRECONDITION; });
        };
        ValidationComponent_1.prototype.getFeatureActions = function (validationRowValue) {
            var _this = this;
            return [
                { name: "menu.deleteFeature", icon: 'delete', onClick: function () { return _this.deleteFeature(validationRowValue.answers[0].feature.id); } },
            ];
        };
        ValidationComponent_1.prototype.getPreconditionActions = function (validationRowValue) {
            var _this = this;
            return [
                { name: "menu.addPrecondition", icon: 'add', onClick: function () { return _this.addValidationRow(validationRowValue.answers[0].feature); } },
                { name: "menu.deletePrecondition", icon: 'delete', onClick: function () { return _this.deleteFeaturePreCondition(validationRowValue.answers[0].featurePrecondition.id); } },
            ];
        };
        ValidationComponent_1.prototype.getExampleActions = function (validationRowValue) {
            var _this = this;
            return [
                { name: "menu.addExample", icon: 'add', onClick: function () { return _this.addValidationRow(validationRowValue.answers[0].feature, _this.getRowPreConditionAnswer(validationRowValue).featurePrecondition, validationRowValue.answers[0].stakeholder); } },
                { name: "menu.deleteExample", icon: 'delete', onClick: function () { return _this.deleteRow(validationRowValue.rowId); } },
                { name: "menu.noExample", icon: 'cancel', onClick: function () { return _this.setNoExampleAnswer(validationRowValue); } }
            ];
        };
        ValidationComponent_1.prototype.deleteFeature = function (id) {
            var _this = this;
            this.featureService.delete(id).subscribe(function (next) { return _this.reloadComponent(); });
        };
        ValidationComponent_1.prototype.deleteFeaturePreCondition = function (id) {
            var _this = this;
            this.featurePreconditionService.delete(id).subscribe(function (next) { return _this.reloadComponent(); });
        };
        ValidationComponent_1.prototype.reloadComponent = function () {
            var _this = this;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
                _this.router.navigate(['validation'], { queryParams: { questionnaireId: _this.questionnaireId, tabIndex: _this.tabIndex } }).then(function () {
                });
            });
        };
        ValidationComponent_1.prototype.getStakeholderColorClass = function (answer, column) {
            if (answer !== null && (column == 2 || column == 11)) {
                var currentStakeholder = answer.trim();
                var index = 0;
                if (currentStakeholder.length == 0) {
                    return "none";
                }
                for (var i = 0; i < this.stakeholders.length; i++) {
                    index = i;
                    if (currentStakeholder === this.stakeholders[i].name) {
                        break;
                    }
                }
                var colorIndex = index % global_constants_1.GlobalConstants.STAKEHOLDER_COLOR_ORDER.length;
                return global_constants_1.GlobalConstants.STAKEHOLDER_COLOR_ORDER[colorIndex];
            }
            else {
                return "";
            }
        };
        ValidationComponent_1.prototype.getStakeHolderAction = function (validation, validationRowValue) {
            var _this = this;
            return function (stakeHolder) { return _this.onStakeholderChange(stakeHolder, validation, validationRowValue); };
        };
        ValidationComponent_1.prototype.getStakeHolderMenuAction = function (validationRowValue) {
            var validationForStakeHolder = this.validations.find(function (v) { return v.type === validation_1.ValidationType.STAKEHOLDER; });
            if (validationForStakeHolder) {
                return this.getStakeHolderAction(validationForStakeHolder, validationRowValue);
            }
        };
        ValidationComponent_1.prototype.onFeatureCustomIdChange = function (customId, feature) {
            var _this = this;
            setTimeout(function () {
                _this.featureService.update(feature.id, feature.answer, customId).subscribe(function (next) { });
            }, this.TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE);
        };
        ValidationComponent_1.prototype.autoGrow = function (event) {
            var element = event.target;
            element.style.height = '5px';
            element.style.height = (element.scrollHeight) + 'px';
        };
        ValidationComponent_1.prototype.getValidationValue = function (answer) {
            return validation_value_1.ValidationValue[answer];
        };
        return ValidationComponent_1;
    }());
    __setFunctionName(_classThis, "ValidationComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _menuComponent_decorators = [(0, core_1.ViewChild)('PreconditionMenu')];
        _tabIndex_decorators = [(0, core_1.Input)()];
        _columns_decorators = [(0, core_1.Input)()];
        _featureGroup_decorators = [(0, core_1.Input)()];
        _stakeholders_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _menuComponent_decorators, { kind: "field", name: "menuComponent", static: false, private: false, access: { has: function (obj) { return "menuComponent" in obj; }, get: function (obj) { return obj.menuComponent; }, set: function (obj, value) { obj.menuComponent = value; } }, metadata: _metadata }, _menuComponent_initializers, _menuComponent_extraInitializers);
        __esDecorate(null, null, _tabIndex_decorators, { kind: "field", name: "tabIndex", static: false, private: false, access: { has: function (obj) { return "tabIndex" in obj; }, get: function (obj) { return obj.tabIndex; }, set: function (obj, value) { obj.tabIndex = value; } }, metadata: _metadata }, _tabIndex_initializers, _tabIndex_extraInitializers);
        __esDecorate(null, null, _columns_decorators, { kind: "field", name: "columns", static: false, private: false, access: { has: function (obj) { return "columns" in obj; }, get: function (obj) { return obj.columns; }, set: function (obj, value) { obj.columns = value; } }, metadata: _metadata }, _columns_initializers, _columns_extraInitializers);
        __esDecorate(null, null, _featureGroup_decorators, { kind: "field", name: "featureGroup", static: false, private: false, access: { has: function (obj) { return "featureGroup" in obj; }, get: function (obj) { return obj.featureGroup; }, set: function (obj, value) { obj.featureGroup = value; } }, metadata: _metadata }, _featureGroup_initializers, _featureGroup_extraInitializers);
        __esDecorate(null, null, _stakeholders_decorators, { kind: "field", name: "stakeholders", static: false, private: false, access: { has: function (obj) { return "stakeholders" in obj; }, get: function (obj) { return obj.stakeholders; }, set: function (obj, value) { obj.stakeholders = value; } }, metadata: _metadata }, _stakeholders_initializers, _stakeholders_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ValidationComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ValidationComponent = _classThis;
}();
exports.ValidationComponent = ValidationComponent;
//# sourceMappingURL=validation.component.js.map