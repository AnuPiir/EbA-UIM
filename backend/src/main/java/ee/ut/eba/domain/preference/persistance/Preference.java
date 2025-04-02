package ee.ut.eba.domain.preference.persistance;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Entity
@Getter
@Setter
@Table(name = Preference.TABLE)
@ToString
@Accessors(chain = true)
public class Preference {

	public static final String TABLE = "preference";

	@Id
	private String type;

	@Column
	private String value;

}
