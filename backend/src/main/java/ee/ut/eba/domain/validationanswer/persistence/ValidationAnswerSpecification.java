package ee.ut.eba.domain.validationanswer.persistence;

import ee.ut.eba.domain.feature.persistence.Feature_;
import ee.ut.eba.domain.featuregroup.persistence.FeatureGroup_;
import ee.ut.eba.domain.featureprecondition.persistence.FeaturePrecondition_;
import ee.ut.eba.domain.questionnaire.persistence.Questionnaire_;
import ee.ut.eba.domain.stakeholder.persistence.Stakeholder_;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationAnswerSpecification {

  public static Specification<ValidationAnswer> questionnaireId(Integer id) {
    return (root, query, builder) -> builder.equal(root.get(ValidationAnswer_.questionnaire).get(Questionnaire_.id), id);
  }

  public static Specification<ValidationAnswer> featureGroupId(Integer id) {
    return (root, query, builder) -> builder.equal(root.get(ValidationAnswer_.featureGroup).get(FeatureGroup_.id), id);
  }

  public static Specification<ValidationAnswer> rowId(Integer id) {
    return (root, query, builder) -> builder.equal(root.get(ValidationAnswer_.rowId), id);
  }

  public static Specification<ValidationAnswer> stakeHolderId(Integer id) {
    return (root, query, builder) -> builder.equal(root.get(ValidationAnswer_.stakeholder).get(Stakeholder_.id), id);
  }

  public static Specification<ValidationAnswer> featureId(Integer id) {
    return (root, query, builder) -> builder.equal(root.get(ValidationAnswer_.feature).get(Feature_.id), id);
  }

  public static Specification<ValidationAnswer> featurePreconditionId(Integer id) {
    return (root, query, builder) -> builder.equal(root.get(ValidationAnswer_.featurePrecondition).get(FeaturePrecondition_.id), id);
  }
}
