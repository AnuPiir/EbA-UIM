package ee.ut.eba.domain.validationanswer.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ValidationAnswerRepository extends JpaRepository<ValidationAnswer, Integer>, JpaSpecificationExecutor<ValidationAnswer> {}
