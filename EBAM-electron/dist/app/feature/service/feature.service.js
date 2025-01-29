"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const feature_endpoint_constants_1 = require("../../constants/feature-endpoint-constants");
let FeatureService = class FeatureService {
    constructor(http) {
        this.http = http;
    }
    create(answer) {
        return this.http.post(feature_endpoint_constants_1.FeatureEndpointConstants.rootUri(), { answer: answer });
    }
    update(id, answer, customId) {
        return this.http.put(feature_endpoint_constants_1.FeatureEndpointConstants.idPath(id), { answer: answer, customId: customId });
    }
    delete(id) {
        return this.http.delete(feature_endpoint_constants_1.FeatureEndpointConstants.idPath(id));
    }
};
FeatureService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], FeatureService);
exports.FeatureService = FeatureService;
//# sourceMappingURL=feature.service.js.map