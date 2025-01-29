"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombinationViewComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const global_constants_1 = require("../constants/global-constants");
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
                if (this.translateService.currentLang === global_constants_1.GlobalConstants.ET) {
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
        if (this.translateService.currentLang === global_constants_1.GlobalConstants.ET) {
            return validationCombinationResult.resultEt;
        }
        return validationCombinationResult.resultEn;
    }
};
CombinationViewComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-combination-view',
        templateUrl: './combination-view.component.html',
        styleUrls: ['./combination-view.component.css']
    })
], CombinationViewComponent);
exports.CombinationViewComponent = CombinationViewComponent;
//# sourceMappingURL=combination-view.component.js.map