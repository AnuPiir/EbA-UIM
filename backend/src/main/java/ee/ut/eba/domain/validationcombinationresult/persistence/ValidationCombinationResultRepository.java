package ee.ut.eba.domain.validationcombinationresult.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ValidationCombinationResultRepository extends JpaRepository<ValidationCombinationResult, Integer>, JpaSpecificationExecutor<ValidationCombinationResult> {}
