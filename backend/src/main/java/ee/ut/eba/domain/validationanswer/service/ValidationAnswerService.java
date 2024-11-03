package ee.ut.eba.domain.validationanswer.service;

import ee.ut.eba.domain.feature.service.FeatureService;
import ee.ut.eba.domain.featuregroup.service.FeatureGroupService;
import ee.ut.eba.domain.featureprecondition.persistence.FeaturePrecondition;
import ee.ut.eba.domain.featureprecondition.service.FeaturePreconditionService;
import ee.ut.eba.domain.questionnaire.service.QuestionnaireService;
import ee.ut.eba.domain.stakeholder.service.StakeholderService;
import ee.ut.eba.domain.validation.service.ValidationService;
import ee.ut.eba.domain.validationanswer.persistence.ValidationAnswer;
import ee.ut.eba.domain.validationanswer.persistence.ValidationAnswerRepository;
import ee.ut.eba.domain.validationanswer.persistence.ValidationAnswerSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static ee.ut.eba.domain.validationanswer.persistence.ValidationAnswerSpecification.rowId;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ValidationAnswerService {

  private final ValidationAnswerRepository validationAnswerRepository;
  private final QuestionnaireService questionnaireService;
  private final ValidationService validationService;
  private final FeaturePreconditionService featurePreconditionService;
  private final FeatureGroupService featureGroupService;
  private final FeatureService featureService;
  private final StakeholderService stakeholderService;

  public ValidationAnswer save(SaveParameters params) {
    FeaturePrecondition featurePrecondition = featurePreconditionService.get(params.featurePreconditionId);

    if (params.type.equals("FEATURE_PRECONDITION") && (!featurePrecondition.getAnswer().equals(params.answer()))) {
        featurePreconditionService.update(featurePrecondition.setAnswer(params.answer()));
    }

    ValidationAnswer validationAnswer =  new ValidationAnswer()
      .setAnswer(params.answer())
      .setId(params.id())
      .setRowId(params.rowId())
      .setType(params.type())
      .setQuestionnaire(questionnaireService.get(params.questionnaireId()))
      .setValidation(validationService.getById(params.validationId()))
      .setFeatureGroup(featureGroupService.get(params.featureGroupId))
      .setFeature(featureService.get(params.featureId))
      .setFeaturePrecondition(featurePrecondition);

    if (params.stakeholderId != null) {
      validationAnswer.setStakeholder(stakeholderService.get(params.stakeholderId));
    }

    return validationAnswerRepository.save(validationAnswer);
  }

  public List<ValidationAnswer> findByQuestionnaireId(Integer id) {
    return validationAnswerRepository.findAll(ValidationAnswerSpecification.questionnaireId(id));
  }
  public List<ValidationAnswer> findByFeatureGroupId(Integer id) {
    return validationAnswerRepository.findAll(ValidationAnswerSpecification.featureGroupId(id));
  }
  public void delete(Integer id) {
    validationAnswerRepository.deleteById(id);
  }

  public void deleteByQuestionnaireId(Integer id) {
    validationAnswerRepository.delete(ValidationAnswerSpecification.questionnaireId(id));
  }

  public void delete(Integer questionnaireId, Integer rowId) {
    validationAnswerRepository.delete(ValidationAnswerSpecification.questionnaireId(questionnaireId).and(rowId(rowId)));
  }

  public void removeStakeHolderById(Integer id) {
    log.info("Removing stakeholder with id: {} from all validation answers", id);
    List<ValidationAnswer> validationAnswers = validationAnswerRepository.findAll(ValidationAnswerSpecification.stakeHolderId(id));
    for (ValidationAnswer validationAnswer : validationAnswers) {
      if (validationAnswer.getType().equals("STAKEHOLDER")) {
        validationAnswer.setAnswer("");
      }
      validationAnswer.setStakeholder(null);
    }

    validationAnswerRepository.saveAll(validationAnswers);
  }

  public void deleteByFeatureId(Integer id) {
    log.info("Deleting all validation answers by feature id: {}", id);
    validationAnswerRepository.deleteAll(validationAnswerRepository.findAll(ValidationAnswerSpecification.featureId(id)));
  }

  public void deleteByFeaturePreconditionId(Integer id) {
    log.info("Deleting all validation answers by feature precondition id: {}", id);
    validationAnswerRepository.deleteAll(validationAnswerRepository.findAll(ValidationAnswerSpecification.featurePreconditionId(id)));
  }

  public void updateStakeHolderAnswers(Integer stakeholderId, String stakeholderName) {
    List<ValidationAnswer> validationAnswers = validationAnswerRepository.findAll(ValidationAnswerSpecification.stakeHolderId(stakeholderId));
    for (ValidationAnswer validationAnswer : validationAnswers) {
      if (validationAnswer.getType().equals("STAKEHOLDER")) {
        validationAnswer.setAnswer(stakeholderName);
        validationAnswerRepository.save(validationAnswer);
      }
    }
  }

  public record SaveParameters(
    Integer id,
    Integer rowId,
    String answer,
    String type,
    Integer questionnaireId,
    Integer validationId,
    Integer featurePreconditionId,
    Integer featureGroupId,
    Integer featureId,
    Integer stakeholderId
  ) { }
}
