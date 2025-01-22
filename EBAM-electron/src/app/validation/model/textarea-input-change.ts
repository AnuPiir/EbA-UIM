import { ValidationAnswer } from './validation-answer';
import { Validation } from './validation';
import { ValidationRow } from './validation-row';

export interface TextareaInputChange {
  inputValue: string;
  validationRowAnswer: ValidationAnswer;
  validation: Validation;
  validationRowValue: ValidationRow
}
