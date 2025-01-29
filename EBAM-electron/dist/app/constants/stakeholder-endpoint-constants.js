"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeholderEndpointConstants = void 0;
class StakeholderEndpointConstants {
    static { this.API_ENDPOINT = 'api/'; }
    static rootUri() {
        return StakeholderEndpointConstants.API_ENDPOINT + 'stakeholder';
    }
    static getByQuestionnaireId(questionnaireId) {
        return this.rootUri() + '/questionnaire-id/' + questionnaireId;
    }
    static idPath(id) {
        return this.rootUri() + '/' + id;
    }
}
exports.StakeholderEndpointConstants = StakeholderEndpointConstants;
//# sourceMappingURL=stakeholder-endpoint-constants.js.map