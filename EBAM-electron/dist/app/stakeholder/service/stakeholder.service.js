"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeholderService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const stakeholder_endpoint_constants_1 = require("../../constants/stakeholder-endpoint-constants");
let StakeholderService = class StakeholderService {
    constructor(http) {
        this.http = http;
    }
    createStakeholder(questionnaireId, name) {
        return this.http.post(stakeholder_endpoint_constants_1.StakeholderEndpointConstants.rootUri(), { name: name, questionnaireId: questionnaireId });
    }
    update(stakeHolderId, name) {
        return this.http.put(stakeholder_endpoint_constants_1.StakeholderEndpointConstants.idPath(stakeHolderId), { name: name });
    }
    getStakeholdersByQuestionnaireId(questionnaireId) {
        return this.http.get(stakeholder_endpoint_constants_1.StakeholderEndpointConstants.getByQuestionnaireId(questionnaireId));
    }
    deleteStakeholder(id) {
        return this.http.delete(stakeholder_endpoint_constants_1.StakeholderEndpointConstants.idPath(id));
    }
};
StakeholderService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], StakeholderService);
exports.StakeholderService = StakeholderService;
//# sourceMappingURL=stakeholder.service.js.map