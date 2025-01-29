"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
let AppComponent = class AppComponent {
    constructor(translate) {
        this.translate = translate;
        this.currentColorScheme = 'scheme1';
        translate.setDefaultLang('et');
        translate.use('et');
    }
    toggleColorScheme() {
        this.currentColorScheme = this.currentColorScheme === 'scheme1' ? 'scheme2' : 'scheme1';
    }
};
AppComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-root',
        templateUrl: './app.component.html',
        providers: [http_1.HttpClientModule],
        styleUrls: ['./app.component.css']
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map