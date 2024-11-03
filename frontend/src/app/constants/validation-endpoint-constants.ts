
export class ValidationEndpointConstants {

  static API_ENDPOINT = 'api/';

  static getValidationUri(): string {
    return ValidationEndpointConstants.API_ENDPOINT + 'validation'
  }

  static getValidationCombinationResultUri(): string {
    return ValidationEndpointConstants.API_ENDPOINT + 'validation-combination-result'
  }

  static getValidationAnswersUri(): string {
    return ValidationEndpointConstants.API_ENDPOINT + 'validation-answer'
  }

  static getValidationAnswersByQuestionnaireIdUri(questionnaireId: number): string {
    return this.getValidationAnswersUri() + '/questionnaire-id/' + questionnaireId;
  }

  static getValidationAnswersByFeatureGroupUri(featureGroupId: number): string {
    return this.getValidationAnswersUri() + '/feature-group-id/' + featureGroupId;
  }

  static deleteValidationAnswersByQuestionnaireIdUriAndRowId(questionnaireId: number, rowId: number): string {
    return this.getValidationAnswersByQuestionnaireIdUri(questionnaireId) + '/row-id/' + rowId;
  }
}
