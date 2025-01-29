import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ValidationValue, ValidationValue2LabelMapping } from '../validation/model/validation-value';
import { GlobalConstants } from '../constants/global-constants';
let SelectComponent = class SelectComponent {
    constructor(elementRef, translateService) {
        this.elementRef = elementRef;
        this.translateService = translateService;
        this.validationValue2LabelMapping = ValidationValue2LabelMapping;
        this.validationValues = Object.values(ValidationValue);
        this.isToggled = false;
        this.selectionChange = new EventEmitter();
    }
    toggleSelect() {
        this.isToggled = !this.isToggled;
    }
    customSelectionValue() {
        if (!Object.keys(this.validationValue2LabelMapping).includes(this.selectedValue)) {
            if (this.translateService.currentLang === GlobalConstants.ET) {
                return "Vali";
            }
            return "Select";
        }
        return 'select.' + this.validationValue2LabelMapping[this.selectedValue];
    }
    onValueChange(validationValue) {
        this.selectedValue = validationValue;
        this.selectionChange.emit(validationValue);
        this.toggleSelect();
    }
    handleClickOutside(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            // Clicked outside of the menu
            this.isToggled = false;
        }
    }
};
__decorate([
    Input()
], SelectComponent.prototype, "selectedValue", void 0);
__decorate([
    Output()
], SelectComponent.prototype, "selectionChange", void 0);
__decorate([
    HostListener('document:click', ['$event'])
], SelectComponent.prototype, "handleClickOutside", null);
SelectComponent = __decorate([
    Component({
        selector: 'app-select',
        templateUrl: './select.component.html',
        styleUrls: ['./select.component.css']
    })
], SelectComponent);
export { SelectComponent };
//# sourceMappingURL=select.component.js.map