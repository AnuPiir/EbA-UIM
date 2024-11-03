package ee.ut.eba.domain.validation.api;

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
public class ValidationResponse {

  private Integer id;
  private String nameEt;
  private String nameEn;
  private String tooltipEt;
  private String tooltipEn;
  private Integer weight;
  private String type;
  private List<ValidationAutofill> validationAutofillList;

  @Getter
  @Setter
  @ToString
  @NoArgsConstructor
  @AllArgsConstructor
  public static class ValidationAutofill {

    private Integer validationFilledById;
    private Integer weight;
    private String placeholder;
    private String type;
  }
}
