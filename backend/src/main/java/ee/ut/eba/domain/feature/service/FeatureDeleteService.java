package ee.ut.eba.domain.feature.service;

import ee.ut.eba.domain.feature.persistence.FeatureRepository;
import ee.ut.eba.domain.validationanswer.service.ValidationAnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class FeatureDeleteService {

  private final FeatureRepository featureRepository;
  private final ValidationAnswerService validationAnswerService;


  public void delete(Integer id) {
    featureRepository.deleteById(id);
  }

  public void deleteAndRemoveValidationAnswersRelatedToFeature(Integer id) {
    validationAnswerService.deleteByFeatureId(id);
    delete(id);
  }
}
