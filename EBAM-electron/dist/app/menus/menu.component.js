"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let MenuComponent = class MenuComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.actions = [];
        this.isToggled = false;
        this.stakeholderListToggled = false;
        this.colorListToggled = false;
    }
    toggleMenu(component) {
        if (component == "Menu") {
            if (this.stakeholderListToggled == true) {
                this.isToggled = false;
                this.stakeholderListToggled = !this.stakeholderListToggled;
            }
            else {
                this.isToggled = !this.isToggled;
            }
        }
        else if (component == "Stakeholders") {
            this.isToggled = false;
            this.stakeholderListToggled = !this.stakeholderListToggled;
        }
        else if (component == "Colors") {
            this.colorListToggled = !this.colorListToggled;
        }
    }
    stakeHolderAction() {
        return { onClick: (stakeHolder) => this.returnStakeHolder(stakeHolder) };
    }
    returnStakeHolder(stakeHolder) {
        this.returnAction(stakeHolder);
    }
    handleClickOutside(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            // Clicked outside of the menu
            this.isToggled = false;
        }
    }
    stakeHolderCloseAction() {
        return { onClick: () => this.stakeholderListToggled = false };
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], MenuComponent.prototype, "icon", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], MenuComponent.prototype, "actions", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], MenuComponent.prototype, "returnAction", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], MenuComponent.prototype, "stakeholders", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], MenuComponent.prototype, "toggle", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], MenuComponent.prototype, "isStakeholdersCell", void 0);
tslib_1.__decorate([
    (0, core_1.HostListener)('document:click', ['$event'])
], MenuComponent.prototype, "handleClickOutside", null);
MenuComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-menu',
        templateUrl: './menu.component.html',
        styleUrls: ['./menu.component.css']
    })
], MenuComponent);
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map