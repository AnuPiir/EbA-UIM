package ee.ut.eba.domain.featureprecondition.api;


import ee.ut.eba.domain.featureprecondition.persistence.FeaturePrecondition;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FeaturePreconditionMapper {

  public static FeaturePreconditionResponse toResponse(FeaturePrecondition featurePrecondition) {
    return new FeaturePreconditionResponse(
      featurePrecondition.getId(),
      featurePrecondition.getAnswer()
    );
  }
}
