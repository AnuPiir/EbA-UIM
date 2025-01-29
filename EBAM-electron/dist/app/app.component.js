import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
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
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        providers: [HttpClientModule],
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map