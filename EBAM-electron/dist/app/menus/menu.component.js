import { __decorate } from "tslib";
import { Component, HostListener, Input } from '@angular/core';
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
__decorate([
    Input()
], MenuComponent.prototype, "icon", void 0);
__decorate([
    Input()
], MenuComponent.prototype, "actions", void 0);
__decorate([
    Input()
], MenuComponent.prototype, "returnAction", void 0);
__decorate([
    Input()
], MenuComponent.prototype, "stakeholders", void 0);
__decorate([
    Input()
], MenuComponent.prototype, "toggle", void 0);
__decorate([
    Input()
], MenuComponent.prototype, "isStakeholdersCell", void 0);
__decorate([
    HostListener('document:click', ['$event'])
], MenuComponent.prototype, "handleClickOutside", null);
MenuComponent = __decorate([
    Component({
        selector: 'app-menu',
        templateUrl: './menu.component.html',
        styleUrls: ['./menu.component.css']
    })
], MenuComponent);
export { MenuComponent };
//# sourceMappingURL=menu.component.js.map