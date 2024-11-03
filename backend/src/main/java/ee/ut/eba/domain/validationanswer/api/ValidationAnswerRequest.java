package ee.ut.eba.domain.validationanswer.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
public class ValidationAnswerRequest {

  @Positive
  private Integer id;

  @NotNull
  @Positive
  private Integer rowId;

  @NotNull
  private String answer;

  @NotNull
  private String type;

  @NotNull
  @Positive
  private Integer questionnaireId;

  @NotNull
  @Positive
  private Integer validationId;

  @NotNull
  @Positive
  private Integer featureGroupId;

  @Valid
  private FeaturePreConditionRequest featurePrecondition;

  @Valid
  private FeatureRequest feature;

  @Valid
  private StakeholderRequest stakeholder;

  @Getter
  @Setter
  @ToString
  @NoArgsConstructor
  @AllArgsConstructor
  public static class FeatureRequest {

    @NotNull
    @Positive
    private Integer id;

    @NotNull
    private String answer;
  }

  @Getter
  @Setter
  @ToString
  @NoArgsConstructor
  @AllArgsConstructor
  public static class FeaturePreConditionRequest {

    @Positive
    private Integer id;

    @NotNull
    private String answer;
  }

  @Getter
  @Setter
  @ToString
  @NoArgsConstructor
  @AllArgsConstructor
  public static class StakeholderRequest {

    @NotNull
    @Positive
    private Integer id;

    @NotNull
    private String name;
  }
}


