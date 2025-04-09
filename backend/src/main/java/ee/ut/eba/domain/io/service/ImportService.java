package ee.ut.eba.domain.io.service;

import ee.ut.eba.domain.feature.persistence.Feature;
import ee.ut.eba.domain.feature.service.FeatureService;
import ee.ut.eba.domain.featuregroup.service.FeatureGroupService;
import ee.ut.eba.domain.featureprecondition.persistence.FeaturePrecondition;
import ee.ut.eba.domain.featureprecondition.service.FeaturePreconditionService;
import ee.ut.eba.domain.io.model.json.*;
import ee.ut.eba.domain.questionnaire.persistence.Questionnaire;
import ee.ut.eba.domain.questionnaire.service.QuestionnaireService;
import ee.ut.eba.domain.stakeholder.service.StakeholderService;
import ee.ut.eba.domain.validation.persistence.Validation;
import ee.ut.eba.domain.validation.service.ValidationService;
import ee.ut.eba.domain.validationanswer.service.ValidationAnswerService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImportService {

	private final QuestionnaireService questionnaireService;
	private final FeatureGroupService featureGroupService;
	private final FeaturePreconditionService featurePreconditionService;
	private final FeatureService featureService;
	private final StakeholderService stakeholderService;
	private final ValidationAnswerService validationAnswerService;

	private final Map<Integer, Integer> savedFeatureGroups = new HashMap<>();
	private final Map<Integer, Integer> savedFeaturePreconditions = new HashMap<>();
	private final Map<Integer, Integer> savedFeatures = new HashMap<>();
	private final Map<Integer, Integer> savedStakeholders = new HashMap<>();

	@Transactional
	public int importQuestionnaire(QuestionaireJson jsonData) {
		emptyMemory();
		int questionnaireId = saveQuestionnaire(jsonData);
		for (ValidationAnswerJson validationAnswer : jsonData.validationAnswers()) {
			int validationId = validationAnswer.validation().id();
			int featureGroupId = saveFeatureGroup(validationAnswer.featureGroup(), questionnaireId);
			int featurePreconditionId = saveFeaturePrecondition(validationAnswer.featurePrecondition());
			int featureId = saveFeature(validationAnswer.feature());
			int stakeholderId = saveStakeholder(validationAnswer.stakeholder(), questionnaireId);

			validationAnswerService.save(new ValidationAnswerService.SaveParameters(null, validationAnswer.rowId(),
					validationAnswer.answer(), validationAnswer.type(), questionnaireId, validationId,
					featurePreconditionId, featureGroupId, featureId, stakeholderId,
					validationAnswer.backgroundColor()));
		}
		return questionnaireId;
	}

	private void emptyMemory() {
		savedFeatureGroups.clear();
		savedFeaturePreconditions.clear();
		savedFeatures.clear();
		savedStakeholders.clear();
	}

	private int saveQuestionnaire(QuestionaireJson jsonData) {
		return questionnaireService.save(new Questionnaire().setName(jsonData.name() + " (import)")).getId();
	}

	private int saveFeatureGroup(FeatureGroupJson featureGroup, int questionnaireId) {
		if (savedFeatureGroups.containsKey(featureGroup.id())) {
			return savedFeatureGroups.get(featureGroup.id());
		}
		int newId = featureGroupService
				.create(new FeatureGroupService.CreateParameters(featureGroup.name(), questionnaireId)).getId();
		savedFeatureGroups.put(featureGroup.id(), newId);
		return newId;
	}

	private int saveFeaturePrecondition(FeaturePreconditionJson featurePrecondition) {
		if (savedFeaturePreconditions.containsKey(featurePrecondition.id())) {
			return savedFeaturePreconditions.get(featurePrecondition.id());
		}
		int newId = featurePreconditionService.save(new FeaturePrecondition().setAnswer(featurePrecondition.answer()));
		savedFeaturePreconditions.put(featurePrecondition.id(), newId);
		return newId;
	}

	private int saveFeature(FeatureJson featureJson) {
		if (savedFeatures.containsKey(featureJson.id())) {
			return savedFeatures.get(featureJson.id());
		}

		Feature feature = new Feature();
		feature.setAnswer(featureJson.answer());
		feature.setCustomId(featureJson.customId());

		int newId = featureService.save(feature);
		savedFeatures.put(featureJson.id(), newId);
		return newId;
	}

	private int saveStakeholder(StakeholderJson stakeholder, int questionnaireId) {
		if (savedStakeholders.containsKey(stakeholder.id())) {
			return savedStakeholders.get(stakeholder.id());
		}
		int newId = stakeholderService
				.create(new StakeholderService.CreateParameters(stakeholder.name(), questionnaireId)).getId();
		savedStakeholders.put(stakeholder.id(), newId);
		return newId;
	}
}
