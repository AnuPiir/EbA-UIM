package ee.ut.eba.domain.validationcombinationresult.api;

import ee.ut.eba.domain.validation.api.ValidationResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

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
