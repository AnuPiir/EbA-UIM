export class FeatureEndpointConstants {
  static API_ENDPOINT =  `http://localhost:8080/api/`;

  static rootUri(): string {
    return FeatureEndpointConstants.API_ENDPOINT + 'feature'
  }

  static preConditionRootUri(): string {
    return FeatureEndpointConstants.API_ENDPOINT + 'feature-precondition'
  }
  static preConditionIdPath(id: number | undefined): string {
    return this.preConditionRootUri() + '/' + id
  }
  static idPath(id: number): string {
    return this.rootUri() + '/' + id
  }
}
