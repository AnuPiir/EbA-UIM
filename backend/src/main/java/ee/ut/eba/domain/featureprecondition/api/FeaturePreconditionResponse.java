package ee.ut.eba.domain.featureprecondition.api;

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
public class FeaturePreconditionResponse {

  private Integer id;
  private String answer;
}
