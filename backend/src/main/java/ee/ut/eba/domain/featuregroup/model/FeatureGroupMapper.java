package ee.ut.eba.domain.featuregroup.model;

import ee.ut.eba.domain.featuregroup.persistence.FeatureGroup;
import ee.ut.eba.domain.featuregroup.service.FeatureGroupService;
import java.util.List;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FeatureGroupMapper {

	public static List<FeatureGroupResponse> toResponse(List<FeatureGroup> featureGroups) {
		return featureGroups.stream().map(FeatureGroupMapper::toResponse).toList();
	}

	public static FeatureGroupResponse toResponse(FeatureGroup featureGroup) {
		return new FeatureGroupResponse(featureGroup.getId(), featureGroup.getName());
	}

	public static FeatureGroupService.CreateParameters toCreateParams(FeatureGroupCreateRequest request) {
		return new FeatureGroupService.CreateParameters(request.getName(), request.getQuestionnaireId());
	}
}
