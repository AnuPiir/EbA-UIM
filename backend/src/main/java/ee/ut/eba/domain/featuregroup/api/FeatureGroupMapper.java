package ee.ut.eba.domain.featuregroup.api;

import ee.ut.eba.domain.featuregroup.persistence.FeatureGroup;
import ee.ut.eba.domain.featuregroup.service.FeatureGroupService;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;


@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FeatureGroupMapper {

  public static List<FeatureGroupResponse> toResponse(List<FeatureGroup> featureGroups) {
    return featureGroups.stream().map(FeatureGroupMapper::toResponse).toList();
  }

  public static FeatureGroupResponse toResponse(FeatureGroup featureGroup) {
    return new FeatureGroupResponse(
      featureGroup.getId(),
      featureGroup.getName()
    );
  }

  public static FeatureGroupService.CreateParameters toCreateParams(FeatureGroupCreateRequest request) {
    return new FeatureGroupService.CreateParameters(
      request.getName(),
      request.getQuestionnaireId()
    );
  }
}
