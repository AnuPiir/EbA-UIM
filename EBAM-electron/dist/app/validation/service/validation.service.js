import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { ValidationEndpointConstants } from '../../constants/validation-endpoint-constants.js';
let ValidationService = class ValidationService {
    constructor(http) {
        this.http = http;
    }
    getValidations() {
        return this.http.get(ValidationEndpointConstants.getValidationUri());
    }
    getValidationCombinationResults() {
        return this.http.get(ValidationEndpointConstants.getValidationCombinationResultUri());
    }
    getValidationAnswersByQuestionnaireId(questionnaireId) {
        return this.http.get(ValidationEndpointConstants.getValidationAnswersByQuestionnaireIdUri(questionnaireId));
    }
    getValidationAnswersByFeatureGroupId(featureGroupId) {
        return this.http.get(ValidationEndpointConstants.getValidationAnswersByFeatureGroupUri(featureGroupId));
    }
    deleteValidationAnswersByQuestionnaireIdAndRowId(questionnaireId, rowId) {
        return this.http.delete(ValidationEndpointConstants.deleteValidationAnswersByQuestionnaireIdUriAndRowId(questionnaireId, rowId));
    }
    saveValidationAnswer(validationAnswer) {
        return this.http.put(ValidationEndpointConstants.getValidationAnswersUri(), validationAnswer);
    }
};
ValidationService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ValidationService);
export { ValidationService };
//# sourceMappingURL=validation.service.js.map