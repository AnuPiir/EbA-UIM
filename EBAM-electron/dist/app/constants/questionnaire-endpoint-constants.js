"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireEndpointConstants = void 0;
var QuestionnaireEndpointConstants = /** @class */ (function () {
    function QuestionnaireEndpointConstants() {
    }
    QuestionnaireEndpointConstants.getQuestionnairesUri = function () {
        return QuestionnaireEndpointConstants.API_ENDPOINT + 'questionnaire';
    };
    QuestionnaireEndpointConstants.getQuestionnaireUri = function (questionnaireId) {
        return QuestionnaireEndpointConstants.API_ENDPOINT + 'questionnaire/' + questionnaireId;
    };
    QuestionnaireEndpointConstants.saveQuestionnaireUri = function () {
        return QuestionnaireEndpointConstants.API_ENDPOINT + 'questionnaire';
    };
    QuestionnaireEndpointConstants.API_ENDPOINT = 'api/';
    return QuestionnaireEndpointConstants;
}());
exports.QuestionnaireEndpointConstants = QuestionnaireEndpointConstants;
//# sourceMappingURL=questionnaire-endpoint-constants.js.map