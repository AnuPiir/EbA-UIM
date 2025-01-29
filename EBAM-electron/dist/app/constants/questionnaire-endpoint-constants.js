export class QuestionnaireEndpointConstants {
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
//# sourceMappingURL=questionnaire-endpoint-constants.js.map