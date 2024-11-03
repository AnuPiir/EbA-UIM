package ee.ut.eba.domain.featuregroup.service;

import ee.ut.eba.domain.featuregroup.persistence.FeatureGroup;
import ee.ut.eba.domain.featuregroup.persistence.FeatureGroupRepository;
import ee.ut.eba.domain.featuregroup.persistence.FeatureGroupSpecification;
import ee.ut.eba.domain.questionnaire.service.QuestionnaireService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class FeatureGroupService {

  private final FeatureGroupRepository featureGroupRepository;
  private final QuestionnaireService questionnaireService;

  public FeatureGroup create(CreateParameters createParams) {
    log.info("Creating feature group with params: {}", createParams);

    return featureGroupRepository.save(
      new FeatureGroup()
        .setName(createParams.name())
        .setQuestionnaire(questionnaireService.get(createParams.questionnaireId()))
    );
  }

  public List<FeatureGroup> getByQuestionnaireId(Integer id) {
    return featureGroupRepository.findAll(FeatureGroupSpecification.questionnaireId(id));
  }

  public FeatureGroup get(Integer id) {
    return featureGroupRepository.findById(id).orElseThrow(
      () -> new NoSuchElementException("Feature group not found with id:" + id)
    );
  }

  public void delete(Integer id) {
    featureGroupRepository.deleteById(id);
  }

  public record CreateParameters(String name, Integer questionnaireId) {}
}
