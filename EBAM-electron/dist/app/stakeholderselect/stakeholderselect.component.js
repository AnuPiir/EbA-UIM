import { __decorate } from "tslib";
import { Component, Input, HostListener } from '@angular/core';
import { GlobalConstants } from '../constants/global-constants';
let StakeholderselectComponent = class StakeholderselectComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.stakeholders = [];
        this.isToggled = true;
        this.isFirstClickIgnored = false;
    }
    getStakeholderColorClass(i) {
        let colorIndex = i % GlobalConstants.STAKEHOLDER_COLOR_ORDER.length;
        return GlobalConstants.STAKEHOLDER_COLOR_ORDER[colorIndex];
    }
    handleClickOutside(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            if (!this.isFirstClickIgnored) {
                //Required because when opening element also registers this click
                this.isFirstClickIgnored = true;
                return;
            }
            this.closeAction.onClick();
        }
    }
};
__decorate([
    Input()
], StakeholderselectComponent.prototype, "stakeholders", void 0);
__decorate([
    Input()
], StakeholderselectComponent.prototype, "action", void 0);
__decorate([
    Input()
], StakeholderselectComponent.prototype, "closeAction", void 0);
__decorate([
    HostListener('document:click', ['$event'])
], StakeholderselectComponent.prototype, "handleClickOutside", null);
StakeholderselectComponent = __decorate([
    Component({
        selector: 'app-stakeholderselect',
        templateUrl: './stakeholderselect.component.html',
        styleUrls: ['./stakeholderselect.component.css']
    })
], StakeholderselectComponent);
export { StakeholderselectComponent };
//# sourceMappingURL=stakeholderselect.component.js.map