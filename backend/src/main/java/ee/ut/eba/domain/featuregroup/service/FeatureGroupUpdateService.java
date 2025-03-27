package ee.ut.eba.domain.featuregroup.service;

import ee.ut.eba.domain.featuregroup.persistence.FeatureGroup;
import ee.ut.eba.domain.featuregroup.persistence.FeatureGroupRepository;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class FeatureGroupUpdateService {

	private final FeatureGroupRepository featureGroupRepository;

	public FeatureGroup update(Integer id, String name) {
		FeatureGroup featureGroup = featureGroupRepository.findById(id)
				.orElseThrow(() -> new NoSuchElementException("Feature group not found with id:" + id));
		featureGroup.setName(name);

		return featureGroupRepository.save(featureGroup);
	}
}
