package ee.ut.eba.domain.validationcombination.api;

import ee.ut.eba.domain.validation.api.ValidationResponse;
import ee.ut.eba.domain.validationcombinationresult.api.ValidationCombinationResultResponse;
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
