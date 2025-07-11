package ee.ut.eba.domain.validationcombinationresult.model;

import ee.ut.eba.domain.validation.model.ValidationMapper;
import ee.ut.eba.domain.validationcombination.persistence.ValidationCombination;
import ee.ut.eba.domain.validationcombinationresult.persistence.ValidationCombinationResult;
import java.util.List;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationCombinationResultMapper {

	public static List<ValidationCombinationResultResponse> toResponse(
			List<ValidationCombinationResult> validationCombinationResults) {
		return validationCombinationResults.stream().map(ValidationCombinationResultMapper::toResponse).toList();
	}

	public static ValidationCombinationResultResponse toResponse(
			ValidationCombinationResult validationCombinationResult) {
		return new ValidationCombinationResultResponse(validationCombinationResult.getId(),
				validationCombinationResult.getResultEn(), validationCombinationResult.getResultEt(),
				validationCombinationResult.getValidationCombinations().stream()
						.map(ValidationCombinationResultMapper::toValidationCombinationResponse).toList());
	}

	public static ValidationCombinationResultResponse toResponseNoCombinations(
			ValidationCombinationResult validationCombinationResult) {
		return new ValidationCombinationResultResponse(validationCombinationResult.getId(),
				validationCombinationResult.getResultEn(), validationCombinationResult.getResultEt(), null);
	}

	public static ValidationCombinationResultResponse.ValidationCombinationResponse toValidationCombinationResponse(
			ValidationCombination validationCombination) {
		return new ValidationCombinationResultResponse.ValidationCombinationResponse(validationCombination.getId(),
				ValidationMapper.toResponse(validationCombination.getValidation()),
				validationCombination.getValidationValue());
	}
}
