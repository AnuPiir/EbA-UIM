package ee.ut.eba.domain.questionnaire.service;

import ee.ut.eba.domain.feature.service.FeatureDeleteService;
import ee.ut.eba.domain.featuregroup.service.FeatureGroupService;
import ee.ut.eba.domain.featureprecondition.service.FeaturePreconditionDeleteService;
import ee.ut.eba.domain.stakeholder.service.StakeholderDeleteService;
import ee.ut.eba.domain.validationanswer.persistence.ValidationAnswer;
import ee.ut.eba.domain.validationanswer.service.ValidationAnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionnaireDeleteService {

  private final ValidationAnswerService validationAnswerService;
  private final QuestionnaireService questionnaireService;
  private final FeaturePreconditionDeleteService featurePreconditionDeleteService;
  private final StakeholderDeleteService stakeholderDeleteService;
  private final FeatureDeleteService featureDeleteService;
  private final FeatureGroupService featureGroupService;

  public void delete(Integer id) {
    List<ValidationAnswer> validationAnswers = validationAnswerService.findByQuestionnaireId(id);
    List<Integer> featureIds = new ArrayList<>();
    List<Integer> stakeHolderIds = new ArrayList<>();
    List<Integer> featureGroupIds = new ArrayList<>();
    List<Integer> featurePreConditionIds = new ArrayList<>();

    for (ValidationAnswer validationAnswer : validationAnswers) {
      if (validationAnswer.getFeature() != null) {
        featureIds.add(validationAnswer.getFeature().getId());
      }
      if (validationAnswer.getStakeholder() != null) {
        stakeHolderIds.add(validationAnswer.getStakeholder().getId());
      }
      if (validationAnswer.getFeatureGroup() != null) {
        featureGroupIds.add(validationAnswer.getFeatureGroup().getId());
      }
      if (validationAnswer.getFeaturePrecondition() != null) {
        featurePreConditionIds.add(validationAnswer.getFeaturePrecondition().getId());
      }
    }

    validationAnswerService.deleteByQuestionnaireId(id);
    featurePreConditionIds.forEach(featurePreconditionDeleteService::delete);
    featureIds.forEach(featureDeleteService::delete);
    stakeHolderIds.forEach(stakeholderDeleteService::delete);
    featureGroupIds.forEach(featureGroupService::delete);
    questionnaireService.delete(id);
  }
}
