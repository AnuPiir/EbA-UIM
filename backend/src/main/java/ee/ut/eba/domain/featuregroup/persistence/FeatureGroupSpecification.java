package ee.ut.eba.domain.featuregroup.persistence;

import ee.ut.eba.domain.questionnaire.persistence.Questionnaire_;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class FeatureGroupSpecification {

  public static Specification<FeatureGroup> questionnaireId(Integer id) {
    return (root, query, builder) -> builder.equal(root.get(FeatureGroup_.questionnaire).get(Questionnaire_.id), id);
  }
}
