"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let InfoComponent = class InfoComponent {
    constructor() {
        this.isToggled = false;
    }
    toggleInfo() {
        this.isToggled = !this.isToggled;
    }
};
InfoComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-info',
        templateUrl: './info.component.html',
        styleUrls: ['./info.component.css']
    })
], InfoComponent);
exports.InfoComponent = InfoComponent;
//# sourceMappingURL=info.component.js.map