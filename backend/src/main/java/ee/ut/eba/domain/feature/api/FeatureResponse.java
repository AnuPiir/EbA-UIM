package ee.ut.eba.domain.feature.api;

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
public class FeatureResponse {

  private Integer id;
  private String answer;
  private String customId;
}
