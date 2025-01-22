import { FeatureResponse } from '../../feature/model/feature';
import { FeaturePreCondition } from '../../feature/model/feature-pre-condition';
import { StakeholderResponse } from '../../stakeholder/model/stakeholder-response';

export interface ValidationAnswer {

  id: number | null;
  rowId: number;
  answer: string;
  validationId: number;
  type: string;
  questionnaireId: number;
  featureGroupId: number;
  featurePrecondition: FeaturePreCondition;
  feature: FeatureResponse;
  stakeholder: StakeholderResponse  | undefined;
}
