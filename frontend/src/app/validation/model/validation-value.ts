export enum ValidationValue {
  CHOOSE_OPTION = "CHOOSE_OPTION",
  YES = "YES",
  PARTLY = "PARTLY",
  NO = "NO",
  DONT_KNOW = "DONT_KNOW"
}

export const ValidationValue2LabelMapping: Record<ValidationValue, string> = {
  [ValidationValue.CHOOSE_OPTION]: "chooseOption",
  [ValidationValue.YES]: "yes",  
  [ValidationValue.PARTLY]: "partly",
  [ValidationValue.NO]: "no",
  [ValidationValue.DONT_KNOW]: "dontKnow"
};
