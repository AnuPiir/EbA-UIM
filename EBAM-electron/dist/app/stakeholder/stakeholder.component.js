import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let StakeholderComponent = class StakeholderComponent {
    constructor() {
        this.isToggled = false;
    }
    toggleMenu() {
        this.isToggled = !this.isToggled;
    }
};
__decorate([
    Input()
], StakeholderComponent.prototype, "stakeholder", void 0);
__decorate([
    Input()
], StakeholderComponent.prototype, "color", void 0);
__decorate([
    Input()
], StakeholderComponent.prototype, "editAction", void 0);
__decorate([
    Input()
], StakeholderComponent.prototype, "deleteAction", void 0);
StakeholderComponent = __decorate([
    Component({
        selector: 'app-stakeholder',
        templateUrl: './stakeholder.component.html',
        styleUrls: ['./stakeholder.component.css']
    })
], StakeholderComponent);
export { StakeholderComponent };
//# sourceMappingURL=stakeholder.component.js.map