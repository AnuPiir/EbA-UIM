package ee.ut.eba.domain.featureprecondition.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface FeaturePreconditionRepository extends JpaRepository<FeaturePrecondition, Integer>, JpaSpecificationExecutor<FeaturePrecondition> {}
