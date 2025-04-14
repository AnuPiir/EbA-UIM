package ee.ut.eba.domain.validationanswer.model;

import ee.ut.eba.domain.feature.model.FeatureResponse;
import ee.ut.eba.domain.featureprecondition.model.FeaturePreconditionResponse;
import ee.ut.eba.domain.stakeholder.model.StakeholderResponse;
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
	private String backgroundColor;
	private Boolean prioritized;
	private Boolean conclusionChanged;
}
