export class FeatureGroupEndpointConstants {

  static API_ENDPOINT =  `http://localhost:8080/api/`;

  static rootUri(): string {
    return FeatureGroupEndpointConstants.API_ENDPOINT + 'feature-group'
  }

  static getByQuestionnaireId(questionnaireId: number): string {
    return this.rootUri() + '/questionnaire-id/' + questionnaireId;
  }

  static idPath(id: number): string {
    return this.rootUri() + '/' + id;
  }
}
