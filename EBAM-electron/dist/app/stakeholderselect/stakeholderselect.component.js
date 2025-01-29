"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeholderselectComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const global_constants_1 = require("../constants/global-constants");
let StakeholderselectComponent = class StakeholderselectComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.stakeholders = [];
        this.isToggled = true;
        this.isFirstClickIgnored = false;
    }
    getStakeholderColorClass(i) {
        let colorIndex = i % global_constants_1.GlobalConstants.STAKEHOLDER_COLOR_ORDER.length;
        return global_constants_1.GlobalConstants.STAKEHOLDER_COLOR_ORDER[colorIndex];
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
tslib_1.__decorate([
    (0, core_1.Input)()
], StakeholderselectComponent.prototype, "stakeholders", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], StakeholderselectComponent.prototype, "action", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], StakeholderselectComponent.prototype, "closeAction", void 0);
tslib_1.__decorate([
    (0, core_1.HostListener)('document:click', ['$event'])
], StakeholderselectComponent.prototype, "handleClickOutside", null);
StakeholderselectComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-stakeholderselect',
        templateUrl: './stakeholderselect.component.html',
        styleUrls: ['./stakeholderselect.component.css']
    })
], StakeholderselectComponent);
exports.StakeholderselectComponent = StakeholderselectComponent;
//# sourceMappingURL=stakeholderselect.component.js.map