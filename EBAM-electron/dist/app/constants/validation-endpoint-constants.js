"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationEndpointConstants = void 0;
class ValidationEndpointConstants {
    static { this.API_ENDPOINT = 'api/'; }
    static getValidationUri() {
        return ValidationEndpointConstants.API_ENDPOINT + 'validation';
    }
    static getValidationCombinationResultUri() {
        return ValidationEndpointConstants.API_ENDPOINT + 'validation-combination-result';
    }
    static getValidationAnswersUri() {
        return ValidationEndpointConstants.API_ENDPOINT + 'validation-answer';
    }
    static getValidationAnswersByQuestionnaireIdUri(questionnaireId) {
        return this.getValidationAnswersUri() + '/questionnaire-id/' + questionnaireId;
    }
    static getValidationAnswersByFeatureGroupUri(featureGroupId) {
        return this.getValidationAnswersUri() + '/feature-group-id/' + featureGroupId;
    }
    static deleteValidationAnswersByQuestionnaireIdUriAndRowId(questionnaireId, rowId) {
        return this.getValidationAnswersByQuestionnaireIdUri(questionnaireId) + '/row-id/' + rowId;
    }
}
exports.ValidationEndpointConstants = ValidationEndpointConstants;
//# sourceMappingURL=validation-endpoint-constants.js.map