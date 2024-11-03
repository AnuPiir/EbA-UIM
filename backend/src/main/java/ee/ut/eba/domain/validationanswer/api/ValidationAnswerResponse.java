package ee.ut.eba.domain.validationanswer.api;

import ee.ut.eba.domain.feature.api.FeatureResponse;
import ee.ut.eba.domain.featureprecondition.api.FeaturePreconditionResponse;
import ee.ut.eba.domain.stakeholder.api.StakeholderResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ValidationAnswerResponse {

  private Integer id;
  private Integer rowId;
  private String answer;
  private String type;
  private Integer validationId;
  private Integer questionnaireId;
  private Integer featureGroupId;
  private FeaturePreconditionResponse featurePrecondition;
  private FeatureResponse feature;
  private StakeholderResponse stakeholderResponse;
}
