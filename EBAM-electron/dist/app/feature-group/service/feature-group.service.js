"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureGroupService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const feature_group_endpoint_constants_1 = require("../../constants/feature-group-endpoint-constants");
let FeatureGroupService = class FeatureGroupService {
    constructor(http) {
        this.http = http;
    }
    createFeatureGroup(questionnaireId, name) {
        return this.http.post(feature_group_endpoint_constants_1.FeatureGroupEndpointConstants.rootUri(), { name: name, questionnaireId: questionnaireId });
    }
    getFeatureGroupsByQuestionnaireId(questionnaireId) {
        return this.http.get(feature_group_endpoint_constants_1.FeatureGroupEndpointConstants.getByQuestionnaireId(questionnaireId));
    }
    deleteFeatureGroup(id) {
        return this.http.delete(feature_group_endpoint_constants_1.FeatureGroupEndpointConstants.idPath(id));
    }
    updateFeatureGroup(id, name) {
        return this.http.put(feature_group_endpoint_constants_1.FeatureGroupEndpointConstants.idPath(id), { name: name });
    }
};
FeatureGroupService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    })
], FeatureGroupService);
exports.FeatureGroupService = FeatureGroupService;
//# sourceMappingURL=feature-group.service.js.map