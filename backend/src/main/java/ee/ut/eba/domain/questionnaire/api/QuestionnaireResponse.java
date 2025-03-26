package ee.ut.eba.domain.questionnaire.api;

import ee.ut.eba.domain.validationanswer.api.ValidationAnswerResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class QuestionnaireResponse {

  private Integer id;
  private String name;
  private LocalDateTime lastModified;
  private List<ValidationAnswerResponse> validationAnswers;
}
