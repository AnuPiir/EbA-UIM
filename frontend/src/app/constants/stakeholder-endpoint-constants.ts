export class StakeholderEndpointConstants {

  static API_ENDPOINT =  `http://localhost:8080/api/`;

  static rootUri(): string {
    return StakeholderEndpointConstants.API_ENDPOINT + 'stakeholder'
  }

  static getByQuestionnaireId(questionnaireId: number): string {
    return this.rootUri() + '/questionnaire-id/' + questionnaireId;
  }

  static idPath(id: number): string {
    return this.rootUri() + '/' + id;
  }
}
