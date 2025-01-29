import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { StakeholderEndpointConstants } from '../../constants/stakeholder-endpoint-constants';
let StakeholderService = class StakeholderService {
    constructor(http) {
        this.http = http;
    }
    createStakeholder(questionnaireId, name) {
        return this.http.post(StakeholderEndpointConstants.rootUri(), { name: name, questionnaireId: questionnaireId });
    }
    update(stakeHolderId, name) {
        return this.http.put(StakeholderEndpointConstants.idPath(stakeHolderId), { name: name });
    }
    getStakeholdersByQuestionnaireId(questionnaireId) {
        return this.http.get(StakeholderEndpointConstants.getByQuestionnaireId(questionnaireId));
    }
    deleteStakeholder(id) {
        return this.http.delete(StakeholderEndpointConstants.idPath(id));
    }
};
StakeholderService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], StakeholderService);
export { StakeholderService };
//# sourceMappingURL=stakeholder.service.js.map