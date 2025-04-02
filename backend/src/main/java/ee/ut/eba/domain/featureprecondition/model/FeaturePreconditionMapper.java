package ee.ut.eba.domain.featureprecondition.model;

import ee.ut.eba.domain.featureprecondition.persistence.FeaturePrecondition;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FeaturePreconditionMapper {

	public static FeaturePreconditionResponse toResponse(FeaturePrecondition featurePrecondition) {
		return new FeaturePreconditionResponse(featurePrecondition.getId(), featurePrecondition.getAnswer());
	}
}
