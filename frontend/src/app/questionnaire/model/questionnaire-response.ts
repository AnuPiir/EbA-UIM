import { ValidationAnswer } from '../../validation/model/validation-answer';

export interface QuestionnaireResponse {

  id: number;
  name: string;
  lastModified: string; //ISO format
  validationAnswers: ValidationAnswer[];
}

