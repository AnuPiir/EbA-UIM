"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeholderEndpointConstants = void 0;
var StakeholderEndpointConstants = /** @class */ (function () {
    function StakeholderEndpointConstants() {
    }
    StakeholderEndpointConstants.rootUri = function () {
        return StakeholderEndpointConstants.API_ENDPOINT + 'stakeholder';
    };
    StakeholderEndpointConstants.getByQuestionnaireId = function (questionnaireId) {
        return this.rootUri() + '/questionnaire-id/' + questionnaireId;
    };
    StakeholderEndpointConstants.idPath = function (id) {
        return this.rootUri() + '/' + id;
    };
    StakeholderEndpointConstants.API_ENDPOINT = 'api/';
    return StakeholderEndpointConstants;
}());
exports.StakeholderEndpointConstants = StakeholderEndpointConstants;
//# sourceMappingURL=stakeholder-endpoint-constants.js.map