"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturePreConditionService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const feature_endpoint_constants_1 = require("../../constants/feature-endpoint-constants");
let FeaturePreConditionService = class FeaturePreConditionService {
    constructor(http) {
        this.http = http;
    }
    create(answer) {
        return this.http.post(feature_endpoint_constants_1.FeatureEndpointConstants.preConditionRootUri(), { answer: answer });
    }
    update(id, answer) {
        return this.http.put(feature_endpoint_constants_1.FeatureEndpointConstants.preConditionIdPath(id), { answer: answer });
    }
    delete(id) {
        return this.http.delete(feature_endpoint_constants_1.FeatureEndpointConstants.preConditionIdPath(id));
    }
};
FeaturePreConditionService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], FeaturePreConditionService);
exports.FeaturePreConditionService = FeaturePreConditionService;
//# sourceMappingURL=feature-pre-condition.service.js.map