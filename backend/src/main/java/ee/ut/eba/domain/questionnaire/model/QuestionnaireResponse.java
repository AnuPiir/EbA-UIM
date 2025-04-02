package ee.ut.eba.domain.questionnaire.model;

import ee.ut.eba.domain.validationanswer.model.ValidationAnswerResponse;
import java.time.LocalDateTime;
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
public class QuestionnaireResponse {

	private Integer id;
	private String name;
	private LocalDateTime lastModified;
	private List<ValidationAnswerResponse> validationAnswers;
}
