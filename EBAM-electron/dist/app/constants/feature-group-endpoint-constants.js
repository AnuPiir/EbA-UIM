"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureGroupEndpointConstants = void 0;
class FeatureGroupEndpointConstants {
    static { this.API_ENDPOINT = 'api/'; }
    static rootUri() {
        return FeatureGroupEndpointConstants.API_ENDPOINT + 'feature-group';
    }
    static getByQuestionnaireId(questionnaireId) {
        return this.rootUri() + '/questionnaire-id/' + questionnaireId;
    }
    static idPath(id) {
        return this.rootUri() + '/' + id;
    }
}
exports.FeatureGroupEndpointConstants = FeatureGroupEndpointConstants;
//# sourceMappingURL=feature-group-endpoint-constants.js.map