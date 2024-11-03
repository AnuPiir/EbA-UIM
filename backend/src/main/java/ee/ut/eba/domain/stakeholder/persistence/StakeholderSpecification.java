package ee.ut.eba.domain.stakeholder.persistence;

import ee.ut.eba.domain.questionnaire.persistence.Questionnaire_;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class StakeholderSpecification {

  public static Specification<Stakeholder> questionnaireId(Integer id) {
    return (root, query, builder) -> builder.equal(root.get(Stakeholder_.questionnaire).get(Questionnaire_.id), id);
  }
}
