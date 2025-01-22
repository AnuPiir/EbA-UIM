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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireComponent = void 0;
var core_1 = require("@angular/core");
var delete_modal_component_1 = require("./modal/delete-modal/delete-modal.component");
var edit_modal_component_1 = require("./modal/edit-modal/edit-modal.component");
var common_1 = require("@angular/common");
var QuestionnaireComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-questionnaire',
            templateUrl: './questionnaire.component.html',
            styleUrls: ['./questionnaire.component.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var QuestionnaireComponent = _classThis = /** @class */ (function () {
        function QuestionnaireComponent_1(questionnaireService, modalService, translateService) {
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
        QuestionnaireComponent_1.prototype.ngOnInit = function () {
            this.getQuestionnaires();
        };
        QuestionnaireComponent_1.prototype.getQuestionnaires = function () {
            var _this = this;
            this.loading = true;
            this.questionnaireService.getQuestionnaires().subscribe(function (next) {
                _this.questionnaires = next;
                _this.loading = false;
            }, function () {
                setTimeout(function () {
                    _this.questionnaireService.getQuestionnaires().subscribe(function (next) {
                        _this.questionnaires = next;
                        _this.loading = false;
                    });
                }, _this.TIMEOUT_BEFORE_RETRYING);
            });
        };
        QuestionnaireComponent_1.prototype.addNewQuestionnaire = function (questionnaireName) {
            var _this = this;
            this.questionnaireService.saveQuestionnaire({ id: null, name: questionnaireName }).subscribe(function (next) {
                _this.getQuestionnaires();
            });
        };
        QuestionnaireComponent_1.prototype.toggleAddNewQuistionnaire = function () {
            this.isToggled = !this.isToggled;
        };
        QuestionnaireComponent_1.prototype.openActionButtonsMenu = function () {
            this.isOpen = !this.isOpen;
        };
        QuestionnaireComponent_1.prototype.deleteQuestionnaire = function (questionnaire) {
            var _this = this;
            var initialState = {
                isProject: true,
                questionnaireName: questionnaire.name
            };
            this.modalRef = this.modalService.show(delete_modal_component_1.DeleteModalComponent, {
                class: 'modal-box modal-md',
                initialState: initialState
            });
            this.modalRef.content.onClose.subscribe(function (result) {
                if (result.deleteObject) {
                    _this.loading = true;
                    _this.questionnaireService.deleteQuestionnaire(questionnaire.id).subscribe(function (next) {
                        _this.questionnaires = _this.questionnaires.filter(function (q) { return q.id !== questionnaire.id; });
                        _this.loading = false;
                    }, function () { return _this.loading = false; });
                }
            });
        };
        QuestionnaireComponent_1.prototype.editQuestionnaire = function (questionnaire) {
            var _this = this;
            var initialState = {
                name: questionnaire.name,
                titleTranslationKey: 'editProjectModal.title',
                inputTranslationKey: 'editProjectModal.input',
            };
            this.modalRef = this.modalService.show(edit_modal_component_1.EditModalComponent, {
                class: 'modal-box modal-md',
                initialState: initialState
            });
            this.modalRef.content.onClose.subscribe(function (result) {
                if (result === null || result === void 0 ? void 0 : result.edit) {
                    _this.loading = true;
                    _this.questionnaireService.saveQuestionnaire({ id: questionnaire.id, name: result.newValue }).subscribe(function (next) {
                        var questionnaireToEdit = _this.questionnaires.find(function (q) { return q.id === questionnaire.id; });
                        if (questionnaireToEdit) {
                            questionnaireToEdit.name = result.newValue;
                        }
                        _this.loading = false;
                    }, function () { return _this.loading = false; });
                }
            });
        };
        QuestionnaireComponent_1.prototype.downloadQuestionnaire = function (questionnaire) {
            this.questionnaireService.exportQuestionnaire(questionnaire.id, this.translateService.currentLang).subscribe(function (data) {
                var downloadURL = window.URL.createObjectURL(data);
                var link = document.createElement('a');
                link.href = downloadURL;
                link.download = questionnaire.name + "_" + (0, common_1.formatDate)(new Date(), 'yyyy-MM-dd', 'en-US') + ".xlsx";
                link.click();
            });
        };
        QuestionnaireComponent_1.prototype.getActions = function (questionnaire) {
            var _this = this;
            return [
                { name: "menu.edit", icon: 'edit', onClick: function () { return _this.editQuestionnaire(questionnaire); } },
                { name: "menu.delete", icon: 'delete', onClick: function () { return _this.deleteQuestionnaire(questionnaire); } },
                { name: "menu.download", icon: 'download', onClick: function () { return _this.downloadQuestionnaire(questionnaire); } },
            ];
        };
        return QuestionnaireComponent_1;
    }());
    __setFunctionName(_classThis, "QuestionnaireComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        QuestionnaireComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return QuestionnaireComponent = _classThis;
}();
exports.QuestionnaireComponent = QuestionnaireComponent;
//# sourceMappingURL=questionnaire.component.js.map