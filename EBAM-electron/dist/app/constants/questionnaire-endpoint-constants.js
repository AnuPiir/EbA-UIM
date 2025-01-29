"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireEndpointConstants = void 0;
class QuestionnaireEndpointConstants {
    static { this.API_ENDPOINT = 'api/'; }
    static getQuestionnairesUri() {
        return QuestionnaireEndpointConstants.API_ENDPOINT + 'questionnaire';
    }
    static getQuestionnaireUri(questionnaireId) {
        return QuestionnaireEndpointConstants.API_ENDPOINT + 'questionnaire/' + questionnaireId;
    }
    static saveQuestionnaireUri() {
        return QuestionnaireEndpointConstants.API_ENDPOINT + 'questionnaire';
    }
}
exports.QuestionnaireEndpointConstants = QuestionnaireEndpointConstants;
//# sourceMappingURL=questionnaire-endpoint-constants.js.map