"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureGroupComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const global_constants_1 = require("../constants/global-constants");
const delete_modal_component_1 = require("../questionnaire/modal/delete-modal/delete-modal.component");
const edit_modal_component_1 = require("../questionnaire/modal/edit-modal/edit-modal.component");
let FeatureGroupComponent = class FeatureGroupComponent {
    constructor(featureGroupService, route, router, stakeholderService, modalService) {
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
    }
    ngOnInit() {
        const questionnaireId = this.route.snapshot.queryParamMap.get('questionnaireId');
        const tabIndex = this.route.snapshot.queryParamMap.get('tabIndex');
        if (!questionnaireId || isNaN(Number(questionnaireId))) {
            this.router.navigate(['questionnaire']);
            return;
        }
        if (!(!tabIndex || isNaN(Number(tabIndex)))) {
            this.tabIndex = +tabIndex;
        }
        this.questionnaireId = +questionnaireId;
        this.getData();
    }
    toggleAddNewGroup() {
        this.isToggledGroupAdding = !this.isToggledGroupAdding;
    }
    toggleGroupList() {
        this.isToggledGroupList = !this.isToggledGroupList;
    }
    toggleAddNewStakeholder() {
        this.isToggledStakeholderAdding = !this.isToggledStakeholderAdding;
    }
    toggleStakeholderList() {
        this.isToggledStakeholderList = !this.isToggledStakeholderList;
    }
    getData() {
        this.featureGroupService
            .getFeatureGroupsByQuestionnaireId(this.questionnaireId)
            .subscribe((next) => {
            this.featureGroups = next.sort((a, b) => a.id - b.id);
            this.loading = false;
            setTimeout(() => {
                this.tab.selectedIndex = this.tabIndex;
            });
        });
        this.stakeholderService
            .getStakeholdersByQuestionnaireId(this.questionnaireId)
            .subscribe((next) => {
            this.stakeholders = next.sort((a, b) => a.id - b.id);
            this.loading = false;
            setTimeout(() => {
                this.tab.selectedIndex = this.tabIndex;
            });
        });
    }
    createNewFeatureGroup(featureGroupName) {
        this.featureGroupService.createFeatureGroup(this.questionnaireId, featureGroupName)
            .subscribe(next => {
            this.featureGroups.push(next);
            this.featureGroupName = "";
        });
    }
    createNewStakeholder(stakeholderName) {
        this.stakeholderService.createStakeholder(this.questionnaireId, stakeholderName)
            .subscribe(next => {
            this.stakeholders.push(next);
            this.stakeholderName = "";
        });
    }
    deleteStakeholder(id) {
        this.tabsLoading = true;
        this.stakeholderService.deleteStakeholder(id)
            .subscribe(next => {
            this.stakeholders = this.stakeholders.filter(s => s.id !== id);
            this.tabsLoading = false;
        });
    }
    updateStakeHolder(id, name) {
        this.tabsLoading = true;
        this.stakeholderService.update(id, name)
            .subscribe(next => {
            const stakeholderToEdit = this.stakeholders.find(s => s.id === id);
            if (stakeholderToEdit) {
                stakeholderToEdit.name = name;
            }
            this.tabsLoading = false;
        });
    }
    deleteFeatureGroup(id) {
        this.tabsLoading = true;
        this.featureGroupService.deleteFeatureGroup(id)
            .subscribe(next => {
            this.featureGroups = this.featureGroups.filter(fg => fg.id !== id);
            this.tabsLoading = false;
        });
    }
    updateFeatureGroup(id, name) {
        this.tabsLoading = true;
        this.featureGroupService.updateFeatureGroup(id, name)
            .subscribe(next => {
            const featureGroupToEdit = this.featureGroups.find(fg => fg.id === id);
            if (featureGroupToEdit) {
                featureGroupToEdit.name = name;
            }
            this.tabsLoading = false;
        });
    }
    getStakeholderColorClass(i) {
        let colorIndex = i % global_constants_1.GlobalConstants.STAKEHOLDER_COLOR_ORDER.length;
        return global_constants_1.GlobalConstants.STAKEHOLDER_COLOR_ORDER[colorIndex];
    }
    openFeatureGroupDeleteModal(featureGroup) {
        const initialState = {
            isFeatureGroup: true
        };
        this.modalRef = this.modalService.show(delete_modal_component_1.DeleteModalComponent, {
            class: 'modal-box modal-md', initialState
        });
        this.modalRef.content.onClose.subscribe((result) => {
            if (result.deleteObject) {
                this.deleteFeatureGroup(featureGroup.id);
            }
        });
    }
    openFeatureGroupEditModal(featureGroup) {
        const initialState = {
            name: featureGroup.name,
            titleTranslationKey: 'editFeatureGroupModal.title',
            inputTranslationKey: 'editFeatureGroupModal.input',
        };
        this.modalRef = this.modalService.show(edit_modal_component_1.EditModalComponent, {
            class: 'modal-box modal-md', initialState
        });
        this.modalRef.content.onClose.subscribe((result) => {
            if (result?.edit) {
                this.updateFeatureGroup(featureGroup.id, result?.newValue);
            }
        });
    }
    openStakeholderDeleteModal(stakeholder) {
        const initialState = {
            isStakeholder: true
        };
        this.modalRef = this.modalService.show(delete_modal_component_1.DeleteModalComponent, {
            class: 'modal-box modal-md', initialState
        });
        this.modalRef.content.onClose.subscribe((result) => {
            if (result.deleteObject) {
                this.deleteStakeholder(stakeholder.id);
            }
        });
    }
    openStakeholderEditModal(stakeholder) {
        const initialState = {
            name: stakeholder.name,
            titleTranslationKey: 'editStakeholderModal.title',
            inputTranslationKey: 'editStakeholderModal.input',
        };
        this.modalRef = this.modalService.show(edit_modal_component_1.EditModalComponent, {
            class: 'modal-box modal-md', initialState
        });
        this.modalRef.content.onClose.subscribe((result) => {
            if (result?.edit) {
                this.updateStakeHolder(stakeholder.id, result?.newValue);
            }
        });
    }
    getFeatureGroupEditAction(featureGroup) {
        return () => this.openFeatureGroupEditModal(featureGroup);
    }
    getFeatureGroupDeleteAction(featureGroup) {
        return () => this.openFeatureGroupDeleteModal(featureGroup);
    }
    getStakeholderEditAction(stakeholder) {
        return () => this.openStakeholderEditModal(stakeholder);
    }
    getStakeholderDeleteAction(stakeholder) {
        return () => this.openStakeholderDeleteModal(stakeholder);
    }
};
tslib_1.__decorate([
    (0, core_1.ViewChild)('featureGroupTabs', { static: false })
], FeatureGroupComponent.prototype, "tab", void 0);
FeatureGroupComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-feature-group',
        templateUrl: './feature-group.component.html',
        styleUrls: ['./feature-group.component.css']
    })
], FeatureGroupComponent);
exports.FeatureGroupComponent = FeatureGroupComponent;
//# sourceMappingURL=feature-group.component.js.map