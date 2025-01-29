"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let ToolbarComponent = class ToolbarComponent {
    constructor(translate, questionnaireService, route) {
        this.translate = translate;
        this.questionnaireService = questionnaireService;
        this.route = route;
        this.languages = ['ET', 'EN'];
        this.questionnairePath = "/questionnaire";
        this.method = "/method";
        this.about = "/about";
        this.validationPath = "/validation";
        this.route.queryParams.subscribe(params => {
            if (params['questionnaireId']) {
                this.questionnaireService.getQuestionnaire(params['questionnaireId']).subscribe(next => this.questionnaireName = next.name);
            }
            else {
                this.questionnaireName = null;
            }
        });
    }
    get currentLang() {
        return this.translate.currentLang.toUpperCase();
    }
    setLang(language) {
        this.translate.use(language.toLowerCase());
    }
    isLanguageSelected(language) {
        return this.currentLang == language;
    }
};
ToolbarComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-toolbar',
        templateUrl: './toolbar.component.html',
        styleUrls: ['./toolbar.component.css']
    })
], ToolbarComponent);
exports.ToolbarComponent = ToolbarComponent;
//# sourceMappingURL=toolbar.component.js.map