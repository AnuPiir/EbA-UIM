package ee.ut.eba.domain.validationvalue.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ValidationValueRepository extends JpaRepository<ValidationValue, String>, JpaSpecificationExecutor<ValidationValue> {}
