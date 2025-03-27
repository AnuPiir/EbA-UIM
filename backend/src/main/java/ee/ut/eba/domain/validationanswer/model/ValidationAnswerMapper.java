package ee.ut.eba.domain.validationanswer.model;

import ee.ut.eba.domain.feature.model.FeatureMapper;
import ee.ut.eba.domain.featureprecondition.model.FeaturePreconditionMapper;
import ee.ut.eba.domain.stakeholder.model.StakeholderMapper;
import ee.ut.eba.domain.validationanswer.persistence.ValidationAnswer;
import ee.ut.eba.domain.validationanswer.service.ValidationAnswerService;
import java.util.List;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationAnswerMapper {

	public static ValidationAnswerService.SaveParameters toValidationAnswerSaveParams(
			ValidationAnswerRequest validationAnswer) {
		return new ValidationAnswerService.SaveParameters(validationAnswer.getId(), validationAnswer.getRowId(),
				validationAnswer.getAnswer(), validationAnswer.getType(), validationAnswer.getQuestionnaireId(),
				validationAnswer.getValidationId(),
				validationAnswer.getFeaturePrecondition() != null
						? validationAnswer.getFeaturePrecondition().getId()
						: null,
				validationAnswer.getFeatureGroupId(), validationAnswer.getFeature().getId(),
				validationAnswer.getStakeholder() != null ? validationAnswer.getStakeholder().getId() : null,
				validationAnswer.getBackgroundColor());
	}

	public static List<ValidationAnswerResponse> toResponse(List<ValidationAnswer> validationAnswers) {
		return validationAnswers.stream().map(ValidationAnswerMapper::toResponse).toList();
	}

	public static ValidationAnswerResponse toResponse(ValidationAnswer validationAnswer) {
		return new ValidationAnswerResponse(validationAnswer.getId(), validationAnswer.getRowId(),
				validationAnswer.getAnswer(), validationAnswer.getType(), validationAnswer.getValidation().getId(),
				validationAnswer.getQuestionnaire().getId(), validationAnswer.getFeatureGroup().getId(),
				FeaturePreconditionMapper.toResponse(validationAnswer.getFeaturePrecondition()),
				FeatureMapper.toResponse(validationAnswer.getFeature()),
				validationAnswer.getStakeholder() != null
						? StakeholderMapper.toResponse(validationAnswer.getStakeholder())
						: null,
				validationAnswer.getBackgroundColor());
	}
}
