package ee.ut.eba.domain.feature.service;

import ee.ut.eba.domain.feature.persistence.Feature;
import ee.ut.eba.domain.feature.persistence.FeatureRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class FeatureService {

  private final FeatureRepository featureRepository;

  public Feature create(String answer) {

    return featureRepository.save(new Feature().setAnswer(answer));
  }

  public Feature get(Integer id) {
    log.info("Getting feature with id: {}", id);

    return featureRepository.findById(id).orElseThrow(
      () -> new NoSuchElementException("Feature not found with id:" + id)
    );
  }

  public Feature update(Integer id, String answer, String customId) {
    return featureRepository.save(
      featureRepository.findById(id).orElseThrow(
        () -> new NoSuchElementException("Feature not found with id:" + id)
      ).setAnswer(answer).setCustomId(customId)
    );
  }
}
