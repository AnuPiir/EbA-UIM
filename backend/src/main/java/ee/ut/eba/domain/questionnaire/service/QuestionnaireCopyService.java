package ee.ut.eba.domain.questionnaire.service;

import ee.ut.eba.domain.feature.persistence.Feature;
import ee.ut.eba.domain.feature.service.FeatureService;
import ee.ut.eba.domain.featuregroup.persistence.FeatureGroup;
import ee.ut.eba.domain.featuregroup.service.FeatureGroupService;
import ee.ut.eba.domain.featureprecondition.persistence.FeaturePrecondition;
import ee.ut.eba.domain.featureprecondition.service.FeaturePreconditionService;
import ee.ut.eba.domain.questionnaire.persistence.Questionnaire;
import ee.ut.eba.domain.stakeholder.persistence.Stakeholder;
import ee.ut.eba.domain.stakeholder.service.StakeholderService;
import ee.ut.eba.domain.validation.service.ValidationService;
import ee.ut.eba.domain.validationanswer.persistence.ValidationAnswer;
import ee.ut.eba.domain.validationanswer.service.ValidationAnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionnaireCopyService {

	private final QuestionnaireService questionnaireService;
	private final ValidationService validationService;
	private final FeatureGroupService featureGroupService;
	private final FeaturePreconditionService featurePreconditionService;
	private final FeatureService featureService;
	private final StakeholderService stakeholderService;
	private final ValidationAnswerService validationAnswerService;

	private final Map<Integer, Integer> savedFeatureGroups = new HashMap<>();
	private final Map<Integer, Integer> savedFeaturePreconditions = new HashMap<>();
	private final Map<Integer, Integer> savedFeatures = new HashMap<>();
	private final Map<Integer, Integer> savedStakeholders = new HashMap<>();

	public int makeCopyOfQuestionnaire(Integer id) {
		emptyMemory();

		Questionnaire questionnaire = questionnaireService.get(id);
		List<ValidationAnswer> validationAnswers = validationAnswerService.findByQuestionnaireId(id);

		int newQuestionnaireId = saveQuestionnaire(questionnaire);

		for (ValidationAnswer validationAnswer : validationAnswers) {
			int validationId = validationAnswer.getValidation().getId();
			int featureGroupId = saveFeatureGroup(validationAnswer.getFeatureGroup(), newQuestionnaireId);
			int featurePreconditionId = saveFeaturePrecondition(validationAnswer.getFeaturePrecondition());
			int featureId = saveFeature(validationAnswer.getFeature());
			Integer stakeholderId = saveStakeholder(validationAnswer.getStakeholder(), newQuestionnaireId);

			validationAnswerService.save(new ValidationAnswerService.SaveParameters(null, validationAnswer.getRowId(),
					validationAnswer.getAnswer(), validationAnswer.getType(), newQuestionnaireId, validationId,
					featurePreconditionId, featureGroupId, featureId, stakeholderId,
					validationAnswer.getBackgroundColor(), validationAnswer.getPrioritized(),
					validationAnswer.getConclusionChanged()));
		}

		return newQuestionnaireId;

	}

	private void emptyMemory() {
		savedFeatureGroups.clear();
		savedFeaturePreconditions.clear();
		savedFeatures.clear();
		savedStakeholders.clear();
	}

	private int saveQuestionnaire(Questionnaire questionnaire) {
		return questionnaireService.save(new Questionnaire().setName(questionnaire.getName() + " (copy)")).getId();
	}

	private int saveFeatureGroup(FeatureGroup featureGroup, int questionnaireId) {
		if (savedFeatureGroups.containsKey(featureGroup.getId())) {
			return savedFeatureGroups.get(featureGroup.getId());
		}
		int newId = featureGroupService
				.create(new FeatureGroupService.CreateParameters(featureGroup.getName(), questionnaireId)).getId();
		savedFeatureGroups.put(featureGroup.getId(), newId);
		return newId;
	}

	private int saveFeaturePrecondition(FeaturePrecondition featurePrecondition) {
		if (savedFeaturePreconditions.containsKey(featurePrecondition.getId())) {
			return savedFeaturePreconditions.get(featurePrecondition.getId());
		}
		int newId = featurePreconditionService
				.save(new FeaturePrecondition().setAnswer(featurePrecondition.getAnswer()));
		savedFeaturePreconditions.put(featurePrecondition.getId(), newId);
		return newId;
	}

	private int saveFeature(Feature feature) {
		if (savedFeatures.containsKey(feature.getId())) {
			return savedFeatures.get(feature.getId());
		}

		Feature newFeature = new Feature();
		newFeature.setAnswer(feature.getAnswer());
		newFeature.setCustomId(feature.getCustomId());

		int newId = featureService.save(newFeature);
		savedFeatures.put(feature.getId(), newId);
		return newId;
	}

	private Integer saveStakeholder(Stakeholder stakeholder, int questionnaireId) {
		if (stakeholder == null) {
			return null;
		}
		if (savedStakeholders.containsKey(stakeholder.getId())) {
			return savedStakeholders.get(stakeholder.getId());
		}
		int newId = stakeholderService
				.create(new StakeholderService.CreateParameters(stakeholder.getName(), questionnaireId)).getId();
		savedStakeholders.put(stakeholder.getId(), newId);
		return newId;
	}
}
