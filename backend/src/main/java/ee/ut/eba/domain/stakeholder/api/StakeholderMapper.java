package ee.ut.eba.domain.stakeholder.api;

import ee.ut.eba.domain.stakeholder.persistence.Stakeholder;
import ee.ut.eba.domain.stakeholder.service.StakeholderService;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;


@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class StakeholderMapper {

  public static List<StakeholderResponse> toResponse(List<Stakeholder> featureGroups) {
    return featureGroups.stream().map(StakeholderMapper::toResponse).toList();
  }

  public static StakeholderResponse toResponse(Stakeholder stakeholder) {
    return new StakeholderResponse(
      stakeholder.getId(),
      stakeholder.getName()
    );
  }

  public static StakeholderService.CreateParameters toCreateParams(StakeholderCreateRequest request) {
    return new StakeholderService.CreateParameters(
      request.getName(),
      request.getQuestionnaireId()
    );
  }
}
