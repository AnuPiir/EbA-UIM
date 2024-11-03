package ee.ut.eba.domain.validationautofill.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ValidationAutoFillRepository extends JpaRepository<ValidationAutofill, Integer>, JpaSpecificationExecutor<ValidationAutofill> {}
