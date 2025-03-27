import { ValidationAnswer } from '../../validation/model/validation-answer';

export interface QuestionnaireResponse {

  id: number;
  name: string;
  lastModified: string | null; //ISO format
  validationAnswers: ValidationAnswer[];
}

