package ee.ut.eba.domain.export.persistance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ExcelColumnRepository extends JpaRepository<ExcelColumn, Integer>, JpaSpecificationExecutor<ExcelColumn> {}
