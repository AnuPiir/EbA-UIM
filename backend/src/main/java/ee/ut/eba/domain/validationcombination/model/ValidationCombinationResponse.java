package ee.ut.eba.domain.validationcombination.model;

import ee.ut.eba.domain.validation.model.ValidationResponse;
import ee.ut.eba.domain.validationcombinationresult.model.ValidationCombinationResultResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ValidationCombinationResponse {

	private Integer id;
	private ValidationResponse validation;
	private String validationValue;
	private ValidationCombinationResultResponse validationCombinationResult;
}
