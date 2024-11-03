package ee.ut.eba.domain.stakeholder.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface StakeholderRepository extends JpaRepository<Stakeholder, Integer>, JpaSpecificationExecutor<Stakeholder> {}
