import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { QuestionnaireEndpointConstants } from '../../constants/questionnaire-endpoint-constants';
let QuestionnaireService = class QuestionnaireService {
    constructor(http) {
        this.http = http;
    }
    getQuestionnaires() {
        return this.http.get(QuestionnaireEndpointConstants.getQuestionnairesUri());
    }
    getQuestionnaire(id) {
        return this.http.get(QuestionnaireEndpointConstants.getQuestionnaireUri(id));
    }
    deleteQuestionnaire(id) {
        return this.http.delete(QuestionnaireEndpointConstants.getQuestionnaireUri(id));
    }
    saveQuestionnaire(body) {
        return this.http.put(QuestionnaireEndpointConstants.saveQuestionnaireUri(), body);
    }
    exportQuestionnaire(id, language) {
        const httpOptions = {
            responseType: 'blob'
        };
        return this.http.get('api/excel/' + id + "?language=" + language, httpOptions);
    }
};
QuestionnaireService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], QuestionnaireService);
export { QuestionnaireService };
//# sourceMappingURL=questionnaire.service.js.map