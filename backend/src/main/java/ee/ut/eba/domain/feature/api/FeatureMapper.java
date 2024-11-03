package ee.ut.eba.domain.feature.api;


import ee.ut.eba.domain.feature.persistence.Feature;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FeatureMapper {

  public static FeatureResponse toResponse(Feature feature) {
    return new FeatureResponse(
      feature.getId(),
      feature.getAnswer(),
      feature.getCustomId()
    );
  }
}
