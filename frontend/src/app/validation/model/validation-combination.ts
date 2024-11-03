import { ValidationValue } from './validation-value';
import { ValidationCombinationResult } from './validation-combination-result';

export interface ValidationCombination {

  id: number;
  validationValue: ValidationValue,
  validationResponse: ValidationCombinationResult
}
