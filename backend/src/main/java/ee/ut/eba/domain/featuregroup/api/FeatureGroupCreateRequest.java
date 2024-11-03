package ee.ut.eba.domain.featuregroup.api;

import jakarta.validation.constraints.NotNull;
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
public class FeatureGroupCreateRequest {

  @NotNull
  private String name;

  @NotNull
  private Integer questionnaireId;
}
