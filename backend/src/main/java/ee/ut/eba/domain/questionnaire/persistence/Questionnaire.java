package ee.ut.eba.domain.questionnaire.persistence;

import ee.ut.eba.domain.validationanswer.persistence.ValidationAnswer;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Entity
@Getter
@Setter
@Table(name = Questionnaire.TABLE)
@ToString
@Accessors(chain = true)
public class Questionnaire {

	public static final String TABLE = "questionnaire";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column
	private String name;

	@Column
	private LocalDateTime lastModified;

	@OneToMany(cascade = {CascadeType.ALL}, mappedBy = "questionnaire")
	private List<ValidationAnswer> validationAnswers = new ArrayList<>();
}
