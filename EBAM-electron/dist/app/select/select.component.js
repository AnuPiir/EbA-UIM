"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const validation_value_1 = require("../validation/model/validation-value");
const global_constants_1 = require("../constants/global-constants");
let SelectComponent = class SelectComponent {
    constructor(elementRef, translateService) {
        this.elementRef = elementRef;
        this.translateService = translateService;
        this.validationValue2LabelMapping = validation_value_1.ValidationValue2LabelMapping;
        this.validationValues = Object.values(validation_value_1.ValidationValue);
        this.isToggled = false;
        this.selectionChange = new core_1.EventEmitter();
    }
    toggleSelect() {
        this.isToggled = !this.isToggled;
    }
    customSelectionValue() {
        if (!Object.keys(this.validationValue2LabelMapping).includes(this.selectedValue)) {
            if (this.translateService.currentLang === global_constants_1.GlobalConstants.ET) {
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
tslib_1.__decorate([
    (0, core_1.Input)()
], SelectComponent.prototype, "selectedValue", void 0);
tslib_1.__decorate([
    (0, core_1.Output)()
], SelectComponent.prototype, "selectionChange", void 0);
tslib_1.__decorate([
    (0, core_1.HostListener)('document:click', ['$event'])
], SelectComponent.prototype, "handleClickOutside", null);
SelectComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-select',
        templateUrl: './select.component.html',
        styleUrls: ['./select.component.css']
    })
], SelectComponent);
exports.SelectComponent = SelectComponent;
//# sourceMappingURL=select.component.js.map