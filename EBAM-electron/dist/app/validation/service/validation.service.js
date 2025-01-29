"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const validation_endpoint_constants_1 = require("../../constants/validation-endpoint-constants");
let ValidationService = class ValidationService {
    constructor(http) {
        this.http = http;
    }
    getValidations() {
        return this.http.get(validation_endpoint_constants_1.ValidationEndpointConstants.getValidationUri());
    }
    getValidationCombinationResults() {
        return this.http.get(validation_endpoint_constants_1.ValidationEndpointConstants.getValidationCombinationResultUri());
    }
    getValidationAnswersByQuestionnaireId(questionnaireId) {
        return this.http.get(validation_endpoint_constants_1.ValidationEndpointConstants.getValidationAnswersByQuestionnaireIdUri(questionnaireId));
    }
    getValidationAnswersByFeatureGroupId(featureGroupId) {
        return this.http.get(validation_endpoint_constants_1.ValidationEndpointConstants.getValidationAnswersByFeatureGroupUri(featureGroupId));
    }
    deleteValidationAnswersByQuestionnaireIdAndRowId(questionnaireId, rowId) {
        return this.http.delete(validation_endpoint_constants_1.ValidationEndpointConstants.deleteValidationAnswersByQuestionnaireIdUriAndRowId(questionnaireId, rowId));
    }
    saveValidationAnswer(validationAnswer) {
        return this.http.put(validation_endpoint_constants_1.ValidationEndpointConstants.getValidationAnswersUri(), validationAnswer);
    }
};
ValidationService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], ValidationService);
exports.ValidationService = ValidationService;
//# sourceMappingURL=validation.service.js.map