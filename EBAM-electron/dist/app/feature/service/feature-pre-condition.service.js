import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { FeatureEndpointConstants } from '../../constants/feature-endpoint-constants';
let FeaturePreConditionService = class FeaturePreConditionService {
    constructor(http) {
        this.http = http;
    }
    create(answer) {
        return this.http.post(FeatureEndpointConstants.preConditionRootUri(), { answer: answer });
    }
    update(id, answer) {
        return this.http.put(FeatureEndpointConstants.preConditionIdPath(id), { answer: answer });
    }
    delete(id) {
        return this.http.delete(FeatureEndpointConstants.preConditionIdPath(id));
    }
};
FeaturePreConditionService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FeaturePreConditionService);
export { FeaturePreConditionService };
//# sourceMappingURL=feature-pre-condition.service.js.map