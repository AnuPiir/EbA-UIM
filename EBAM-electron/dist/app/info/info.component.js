import { __decorate } from "tslib";
import { Component } from '@angular/core';
let InfoComponent = class InfoComponent {
    constructor() {
        this.isToggled = false;
    }
    toggleInfo() {
        this.isToggled = !this.isToggled;
    }
};
InfoComponent = __decorate([
    Component({
        selector: 'app-info',
        templateUrl: './info.component.html',
        styleUrls: ['./info.component.css']
    })
], InfoComponent);
export { InfoComponent };
//# sourceMappingURL=info.component.js.map