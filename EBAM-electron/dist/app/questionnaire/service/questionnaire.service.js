"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const questionnaire_endpoint_constants_1 = require("../../constants/questionnaire-endpoint-constants");
let QuestionnaireService = class QuestionnaireService {
    constructor(http) {
        this.http = http;
    }
    getQuestionnaires() {
        return this.http.get(questionnaire_endpoint_constants_1.QuestionnaireEndpointConstants.getQuestionnairesUri());
    }
    getQuestionnaire(id) {
        return this.http.get(questionnaire_endpoint_constants_1.QuestionnaireEndpointConstants.getQuestionnaireUri(id));
    }
    deleteQuestionnaire(id) {
        return this.http.delete(questionnaire_endpoint_constants_1.QuestionnaireEndpointConstants.getQuestionnaireUri(id));
    }
    saveQuestionnaire(body) {
        return this.http.put(questionnaire_endpoint_constants_1.QuestionnaireEndpointConstants.saveQuestionnaireUri(), body);
    }
    exportQuestionnaire(id, language) {
        const httpOptions = {
            responseType: 'blob'
        };
        return this.http.get('api/excel/' + id + "?language=" + language, httpOptions);
    }
};
QuestionnaireService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], QuestionnaireService);
exports.QuestionnaireService = QuestionnaireService;
//# sourceMappingURL=questionnaire.service.js.map