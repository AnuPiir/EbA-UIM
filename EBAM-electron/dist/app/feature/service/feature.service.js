import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { FeatureEndpointConstants } from '../../constants/feature-endpoint-constants';
let FeatureService = class FeatureService {
    constructor(http) {
        this.http = http;
    }
    create(answer) {
        return this.http.post(FeatureEndpointConstants.rootUri(), { answer: answer });
    }
    update(id, answer, customId) {
        return this.http.put(FeatureEndpointConstants.idPath(id), { answer: answer, customId: customId });
    }
    delete(id) {
        return this.http.delete(FeatureEndpointConstants.idPath(id));
    }
};
FeatureService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FeatureService);
export { FeatureService };
//# sourceMappingURL=feature.service.js.map