package ee.ut.eba.domain.featuregroup.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface FeatureGroupRepository extends JpaRepository<FeatureGroup, Integer>, JpaSpecificationExecutor<FeatureGroup> {}
