package ee.ut.eba.domain.questionnaire.api;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class QuestionnaireRequest {

  @Positive
  private Integer id;

  @NotNull
  private String name;

  //Added for completeness, not exactly needed
  private LocalDateTime lastModified;
}
