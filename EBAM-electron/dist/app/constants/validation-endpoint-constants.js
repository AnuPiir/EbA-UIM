"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationEndpointConstants = void 0;
var ValidationEndpointConstants = /** @class */ (function () {
    function ValidationEndpointConstants() {
    }
    ValidationEndpointConstants.getValidationUri = function () {
        return ValidationEndpointConstants.API_ENDPOINT + 'validation';
    };
    ValidationEndpointConstants.getValidationCombinationResultUri = function () {
        return ValidationEndpointConstants.API_ENDPOINT + 'validation-combination-result';
    };
    ValidationEndpointConstants.getValidationAnswersUri = function () {
        return ValidationEndpointConstants.API_ENDPOINT + 'validation-answer';
    };
    ValidationEndpointConstants.getValidationAnswersByQuestionnaireIdUri = function (questionnaireId) {
        return this.getValidationAnswersUri() + '/questionnaire-id/' + questionnaireId;
    };
    ValidationEndpointConstants.getValidationAnswersByFeatureGroupUri = function (featureGroupId) {
        return this.getValidationAnswersUri() + '/feature-group-id/' + featureGroupId;
    };
    ValidationEndpointConstants.deleteValidationAnswersByQuestionnaireIdUriAndRowId = function (questionnaireId, rowId) {
        return this.getValidationAnswersByQuestionnaireIdUri(questionnaireId) + '/row-id/' + rowId;
    };
    ValidationEndpointConstants.API_ENDPOINT = 'api/';
    return ValidationEndpointConstants;
}());
exports.ValidationEndpointConstants = ValidationEndpointConstants;
//# sourceMappingURL=validation-endpoint-constants.js.map