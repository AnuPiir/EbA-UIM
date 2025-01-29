export class FeatureEndpointConstants {
    static { this.API_ENDPOINT = 'api/'; }
    static rootUri() {
        return FeatureEndpointConstants.API_ENDPOINT + 'feature';
    }
    static preConditionRootUri() {
        return FeatureEndpointConstants.API_ENDPOINT + 'feature-precondition';
    }
    static preConditionIdPath(id) {
        return this.preConditionRootUri() + '/' + id;
    }
    static idPath(id) {
        return this.rootUri() + '/' + id;
    }
}
//# sourceMappingURL=feature-endpoint-constants.js.map