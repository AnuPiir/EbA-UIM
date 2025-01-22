"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureGroupEndpointConstants = void 0;
var FeatureGroupEndpointConstants = /** @class */ (function () {
    function FeatureGroupEndpointConstants() {
    }
    FeatureGroupEndpointConstants.rootUri = function () {
        return FeatureGroupEndpointConstants.API_ENDPOINT + 'feature-group';
    };
    FeatureGroupEndpointConstants.getByQuestionnaireId = function (questionnaireId) {
        return this.rootUri() + '/questionnaire-id/' + questionnaireId;
    };
    FeatureGroupEndpointConstants.idPath = function (id) {
        return this.rootUri() + '/' + id;
    };
    FeatureGroupEndpointConstants.API_ENDPOINT = 'api/';
    return FeatureGroupEndpointConstants;
}());
exports.FeatureGroupEndpointConstants = FeatureGroupEndpointConstants;
//# sourceMappingURL=feature-group-endpoint-constants.js.map