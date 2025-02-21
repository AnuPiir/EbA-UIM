export class QuestionnaireEndpointConstants {

  static API_ENDPOINT =  `http://localhost:8080/api/`;

  static getQuestionnairesUri(): string {
    let url = QuestionnaireEndpointConstants.API_ENDPOINT + 'questionnaire';
    console.log("Fetching from:", url);
    return url
  }

  static getQuestionnaireUri(questionnaireId: number): string {
    let url = QuestionnaireEndpointConstants.API_ENDPOINT + 'questionnaire/' + questionnaireId;
    console.log("Fetching from:", url);
    return url
  }

  static saveQuestionnaireUri(): string {
    let url = QuestionnaireEndpointConstants.API_ENDPOINT + 'questionnaire';
    console.log("Fetching from:", url);
    return url
  }
}
