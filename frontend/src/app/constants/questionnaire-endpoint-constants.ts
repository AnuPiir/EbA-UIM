export class QuestionnaireEndpointConstants {

  static API_ENDPOINT =  `http://localhost:8080/api/`;

  static getQuestionnairesUri(): string {
    return QuestionnaireEndpointConstants.API_ENDPOINT + 'questionnaire';
  }

  static getQuestionnaireUri(questionnaireId: number): string {
    return QuestionnaireEndpointConstants.API_ENDPOINT + 'questionnaire/' + questionnaireId;
  }

  static saveQuestionnaireUri(): string {
    return QuestionnaireEndpointConstants.API_ENDPOINT + 'questionnaire';
  }

  static copyQuestionnaireUri(questionnaireId: number): string {
    return QuestionnaireEndpointConstants.API_ENDPOINT + 'questionnaire/' + questionnaireId + '/copy';
  }
}
