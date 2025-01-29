"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeholderComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let StakeholderComponent = class StakeholderComponent {
    constructor() {
        this.isToggled = false;
    }
    toggleMenu() {
        this.isToggled = !this.isToggled;
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], StakeholderComponent.prototype, "stakeholder", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], StakeholderComponent.prototype, "color", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], StakeholderComponent.prototype, "editAction", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], StakeholderComponent.prototype, "deleteAction", void 0);
StakeholderComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-stakeholder',
        templateUrl: './stakeholder.component.html',
        styleUrls: ['./stakeholder.component.css']
    })
], StakeholderComponent);
exports.StakeholderComponent = StakeholderComponent;
//# sourceMappingURL=stakeholder.component.js.map