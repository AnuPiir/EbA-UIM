package ee.ut.eba.domain.validationcombinationresult.model;

import ee.ut.eba.domain.validation.model.ValidationResponse;
import java.util.List;
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
public class ValidationCombinationResultResponse {

	private Integer id;
	private String resultEn;
	private String resultEt;
	private List<ValidationCombinationResponse> validationCombinations;

	@Getter
	@Setter
	@ToString
	@NoArgsConstructor
	@AllArgsConstructor
	public static class ValidationCombinationResponse {
		private Integer id;
		private ValidationResponse validationResponse;
		private String validationValue;
	}
}
