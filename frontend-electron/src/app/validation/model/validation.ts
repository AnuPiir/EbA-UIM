export interface Validation {

  id: number;
  nameEt: string;
  nameEn: string;
  tooltipEt: string;
  tooltipEn: string;
  weight: number;
  type: ValidationType;
  summaryId: number;
  validationAutofillList: ValidationAutofill[];
}
export interface ValidationAutofill {

  validationFilledById: number;
  weight: number;
  placeholder: string;
  type: string;
}


export enum ValidationType {
  SELECT = "SELECT",
  FILL = "FILL",
  TEXT = "TEXT",
  FEATURE = "FEATURE",
  STAKEHOLDER = "STAKEHOLDER",
  FEATURE_PRECONDITION = "FEATURE_PRECONDITION",
  DO = "DO",
  EXAMPLE = "EXAMPLE"
}
