package ee.ut.eba.domain.questionnaire.persistence;

import jakarta.persistence.*;
import java.time.LocalDateTime;
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

	@PreUpdate
	public void onUpdate() {
		lastModified = LocalDateTime.now();
	}

	@PrePersist
	public void onCreate() {
		lastModified = LocalDateTime.now();
	}
}
