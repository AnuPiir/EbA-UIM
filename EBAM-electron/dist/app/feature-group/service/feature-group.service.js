import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { FeatureGroupEndpointConstants } from '../../constants/feature-group-endpoint-constants';
let FeatureGroupService = class FeatureGroupService {
    constructor(http) {
        this.http = http;
    }
    createFeatureGroup(questionnaireId, name) {
        return this.http.post(FeatureGroupEndpointConstants.rootUri(), { name: name, questionnaireId: questionnaireId });
    }
    getFeatureGroupsByQuestionnaireId(questionnaireId) {
        return this.http.get(FeatureGroupEndpointConstants.getByQuestionnaireId(questionnaireId));
    }
    deleteFeatureGroup(id) {
        return this.http.delete(FeatureGroupEndpointConstants.idPath(id));
    }
    updateFeatureGroup(id, name) {
        return this.http.put(FeatureGroupEndpointConstants.idPath(id), { name: name });
    }
};
FeatureGroupService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FeatureGroupService);
export { FeatureGroupService };
//# sourceMappingURL=feature-group.service.js.map