"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureEndpointConstants = void 0;
var FeatureEndpointConstants = /** @class */ (function () {
    function FeatureEndpointConstants() {
    }
    FeatureEndpointConstants.rootUri = function () {
        return FeatureEndpointConstants.API_ENDPOINT + 'feature';
    };
    FeatureEndpointConstants.preConditionRootUri = function () {
        return FeatureEndpointConstants.API_ENDPOINT + 'feature-precondition';
    };
    FeatureEndpointConstants.preConditionIdPath = function (id) {
        return this.preConditionRootUri() + '/' + id;
    };
    FeatureEndpointConstants.idPath = function (id) {
        return this.rootUri() + '/' + id;
    };
    FeatureEndpointConstants.API_ENDPOINT = 'api/';
    return FeatureEndpointConstants;
}());
exports.FeatureEndpointConstants = FeatureEndpointConstants;
//# sourceMappingURL=feature-endpoint-constants.js.map