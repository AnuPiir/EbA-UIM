package ee.ut.eba.domain.questionnaire.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;
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
public class QuestionnaireRequest {

	@Positive
	private Integer id;

	@NotNull
	private String name;

	// Added for completeness, not exactly needed
	private LocalDateTime lastModified;
}
