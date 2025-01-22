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
exports.FeatureGroupComponent = void 0;
var core_1 = require("@angular/core");
var global_constants_1 = require("../constants/global-constants");
var delete_modal_component_1 = require("../questionnaire/modal/delete-modal/delete-modal.component");
var edit_modal_component_1 = require("../questionnaire/modal/edit-modal/edit-modal.component");
var FeatureGroupComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-feature-group',
            templateUrl: './feature-group.component.html',
            styleUrls: ['./feature-group.component.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _tab_decorators;
    var _tab_initializers = [];
    var _tab_extraInitializers = [];
    var FeatureGroupComponent = _classThis = /** @class */ (function () {
        function FeatureGroupComponent_1(featureGroupService, route, router, stakeholderService, modalService) {
            this.featureGroupService = featureGroupService;
            this.route = route;
            this.router = router;
            this.stakeholderService = stakeholderService;
            this.modalService = modalService;
            this.featureGroups = [];
            this.stakeholders = [];
            this.loading = true;
            this.tabsLoading = false;
            this.isToggledGroupAdding = false;
            this.isToggledGroupList = true;
            this.isToggledStakeholderAdding = false;
            this.isToggledStakeholderList = true;
            this.tab = __runInitializers(this, _tab_initializers, void 0);
            this.modalRef = __runInitializers(this, _tab_extraInitializers);
        }
        FeatureGroupComponent_1.prototype.ngOnInit = function () {
            var questionnaireId = this.route.snapshot.queryParamMap.get('questionnaireId');
            var tabIndex = this.route.snapshot.queryParamMap.get('tabIndex');
            if (!questionnaireId || isNaN(Number(questionnaireId))) {
                this.router.navigate(['questionnaire']);
                return;
            }
            if (!(!tabIndex || isNaN(Number(tabIndex)))) {
                this.tabIndex = +tabIndex;
            }
            this.questionnaireId = +questionnaireId;
            this.getData();
        };
        FeatureGroupComponent_1.prototype.toggleAddNewGroup = function () {
            this.isToggledGroupAdding = !this.isToggledGroupAdding;
        };
        FeatureGroupComponent_1.prototype.toggleGroupList = function () {
            this.isToggledGroupList = !this.isToggledGroupList;
        };
        FeatureGroupComponent_1.prototype.toggleAddNewStakeholder = function () {
            this.isToggledStakeholderAdding = !this.isToggledStakeholderAdding;
        };
        FeatureGroupComponent_1.prototype.toggleStakeholderList = function () {
            this.isToggledStakeholderList = !this.isToggledStakeholderList;
        };
        FeatureGroupComponent_1.prototype.getData = function () {
            var _this = this;
            this.featureGroupService
                .getFeatureGroupsByQuestionnaireId(this.questionnaireId)
                .subscribe(function (next) {
                _this.featureGroups = next.sort(function (a, b) { return a.id - b.id; });
                _this.loading = false;
                setTimeout(function () {
                    _this.tab.selectedIndex = _this.tabIndex;
                });
            });
            this.stakeholderService
                .getStakeholdersByQuestionnaireId(this.questionnaireId)
                .subscribe(function (next) {
                _this.stakeholders = next.sort(function (a, b) { return a.id - b.id; });
                _this.loading = false;
                setTimeout(function () {
                    _this.tab.selectedIndex = _this.tabIndex;
                });
            });
        };
        FeatureGroupComponent_1.prototype.createNewFeatureGroup = function (featureGroupName) {
            var _this = this;
            this.featureGroupService.createFeatureGroup(this.questionnaireId, featureGroupName)
                .subscribe(function (next) {
                _this.featureGroups.push(next);
                _this.featureGroupName = "";
            });
        };
        FeatureGroupComponent_1.prototype.createNewStakeholder = function (stakeholderName) {
            var _this = this;
            this.stakeholderService.createStakeholder(this.questionnaireId, stakeholderName)
                .subscribe(function (next) {
                _this.stakeholders.push(next);
                _this.stakeholderName = "";
            });
        };
        FeatureGroupComponent_1.prototype.deleteStakeholder = function (id) {
            var _this = this;
            this.tabsLoading = true;
            this.stakeholderService.deleteStakeholder(id)
                .subscribe(function (next) {
                _this.stakeholders = _this.stakeholders.filter(function (s) { return s.id !== id; });
                _this.tabsLoading = false;
            });
        };
        FeatureGroupComponent_1.prototype.updateStakeHolder = function (id, name) {
            var _this = this;
            this.tabsLoading = true;
            this.stakeholderService.update(id, name)
                .subscribe(function (next) {
                var stakeholderToEdit = _this.stakeholders.find(function (s) { return s.id === id; });
                if (stakeholderToEdit) {
                    stakeholderToEdit.name = name;
                }
                _this.tabsLoading = false;
            });
        };
        FeatureGroupComponent_1.prototype.deleteFeatureGroup = function (id) {
            var _this = this;
            this.tabsLoading = true;
            this.featureGroupService.deleteFeatureGroup(id)
                .subscribe(function (next) {
                _this.featureGroups = _this.featureGroups.filter(function (fg) { return fg.id !== id; });
                _this.tabsLoading = false;
            });
        };
        FeatureGroupComponent_1.prototype.updateFeatureGroup = function (id, name) {
            var _this = this;
            this.tabsLoading = true;
            this.featureGroupService.updateFeatureGroup(id, name)
                .subscribe(function (next) {
                var featureGroupToEdit = _this.featureGroups.find(function (fg) { return fg.id === id; });
                if (featureGroupToEdit) {
                    featureGroupToEdit.name = name;
                }
                _this.tabsLoading = false;
            });
        };
        FeatureGroupComponent_1.prototype.getStakeholderColorClass = function (i) {
            var colorIndex = i % global_constants_1.GlobalConstants.STAKEHOLDER_COLOR_ORDER.length;
            return global_constants_1.GlobalConstants.STAKEHOLDER_COLOR_ORDER[colorIndex];
        };
        FeatureGroupComponent_1.prototype.openFeatureGroupDeleteModal = function (featureGroup) {
            var _this = this;
            var initialState = {
                isFeatureGroup: true
            };
            this.modalRef = this.modalService.show(delete_modal_component_1.DeleteModalComponent, {
                class: 'modal-box modal-md',
                initialState: initialState
            });
            this.modalRef.content.onClose.subscribe(function (result) {
                if (result.deleteObject) {
                    _this.deleteFeatureGroup(featureGroup.id);
                }
            });
        };
        FeatureGroupComponent_1.prototype.openFeatureGroupEditModal = function (featureGroup) {
            var _this = this;
            var initialState = {
                name: featureGroup.name,
                titleTranslationKey: 'editFeatureGroupModal.title',
                inputTranslationKey: 'editFeatureGroupModal.input',
            };
            this.modalRef = this.modalService.show(edit_modal_component_1.EditModalComponent, {
                class: 'modal-box modal-md',
                initialState: initialState
            });
            this.modalRef.content.onClose.subscribe(function (result) {
                if (result === null || result === void 0 ? void 0 : result.edit) {
                    _this.updateFeatureGroup(featureGroup.id, result === null || result === void 0 ? void 0 : result.newValue);
                }
            });
        };
        FeatureGroupComponent_1.prototype.openStakeholderDeleteModal = function (stakeholder) {
            var _this = this;
            var initialState = {
                isStakeholder: true
            };
            this.modalRef = this.modalService.show(delete_modal_component_1.DeleteModalComponent, {
                class: 'modal-box modal-md',
                initialState: initialState
            });
            this.modalRef.content.onClose.subscribe(function (result) {
                if (result.deleteObject) {
                    _this.deleteStakeholder(stakeholder.id);
                }
            });
        };
        FeatureGroupComponent_1.prototype.openStakeholderEditModal = function (stakeholder) {
            var _this = this;
            var initialState = {
                name: stakeholder.name,
                titleTranslationKey: 'editStakeholderModal.title',
                inputTranslationKey: 'editStakeholderModal.input',
            };
            this.modalRef = this.modalService.show(edit_modal_component_1.EditModalComponent, {
                class: 'modal-box modal-md',
                initialState: initialState
            });
            this.modalRef.content.onClose.subscribe(function (result) {
                if (result === null || result === void 0 ? void 0 : result.edit) {
                    _this.updateStakeHolder(stakeholder.id, result === null || result === void 0 ? void 0 : result.newValue);
                }
            });
        };
        FeatureGroupComponent_1.prototype.getFeatureGroupEditAction = function (featureGroup) {
            var _this = this;
            return function () { return _this.openFeatureGroupEditModal(featureGroup); };
        };
        FeatureGroupComponent_1.prototype.getFeatureGroupDeleteAction = function (featureGroup) {
            var _this = this;
            return function () { return _this.openFeatureGroupDeleteModal(featureGroup); };
        };
        FeatureGroupComponent_1.prototype.getStakeholderEditAction = function (stakeholder) {
            var _this = this;
            return function () { return _this.openStakeholderEditModal(stakeholder); };
        };
        FeatureGroupComponent_1.prototype.getStakeholderDeleteAction = function (stakeholder) {
            var _this = this;
            return function () { return _this.openStakeholderDeleteModal(stakeholder); };
        };
        return FeatureGroupComponent_1;
    }());
    __setFunctionName(_classThis, "FeatureGroupComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _tab_decorators = [(0, core_1.ViewChild)('featureGroupTabs', { static: false })];
        __esDecorate(null, null, _tab_decorators, { kind: "field", name: "tab", static: false, private: false, access: { has: function (obj) { return "tab" in obj; }, get: function (obj) { return obj.tab; }, set: function (obj, value) { obj.tab = value; } }, metadata: _metadata }, _tab_initializers, _tab_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FeatureGroupComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FeatureGroupComponent = _classThis;
}();
exports.FeatureGroupComponent = FeatureGroupComponent;
//# sourceMappingURL=feature-group.component.js.map