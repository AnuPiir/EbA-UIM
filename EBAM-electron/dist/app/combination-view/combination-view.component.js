import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { GlobalConstants } from '../constants/global-constants.js';
let CombinationViewComponent = class CombinationViewComponent {
    constructor(validationService, translateService) {
        this.validationService = validationService;
        this.translateService = translateService;
        this.validationCombinationResults = [];
        this.headers = [];
        this.onLanguageChanged();
    }
    ngOnInit() {
        this.validationService.getValidationCombinationResults().subscribe((next) => {
            this.validationCombinationResults = next;
            this.mapResourcesForTableView(this.validationCombinationResults);
        });
    }
    mapResourcesForTableView(results) {
        this.headers = [];
        if (results.length > 0) {
            for (let combinationTitle of results[0].validationCombinations) {
                if (this.translateService.currentLang === GlobalConstants.ET) {
                    this.headers.push(combinationTitle.validationResponse.nameEt);
                    continue;
                }
                this.headers.push(combinationTitle.validationResponse.nameEn);
            }
        }
    }
    onLanguageChanged() {
        this.translateService.onLangChange.subscribe((event) => {
            this.mapResourcesForTableView(this.validationCombinationResults);
        });
    }
    getValidationCombinationResultValueTranslationKey(validationCombinationResult) {
        if (this.translateService.currentLang === GlobalConstants.ET) {
            return validationCombinationResult.resultEt;
        }
        return validationCombinationResult.resultEn;
    }
};
CombinationViewComponent = __decorate([
    Component({
        selector: 'app-combination-view',
        templateUrl: './combination-view.component.html',
        styleUrls: ['./combination-view.component.css']
    })
], CombinationViewComponent);
export { CombinationViewComponent };
//# sourceMappingURL=combination-view.component.js.map