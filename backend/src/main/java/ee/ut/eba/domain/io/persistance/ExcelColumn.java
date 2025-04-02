package ee.ut.eba.domain.io.persistance;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Entity
@Getter
@Setter
@Table(name = ExcelColumn.TABLE)
@ToString
@Accessors(chain = true)
public class ExcelColumn {

	public static final String TABLE = "excel_column";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column
	private String name_et;

	@Column
	private String name_en;
}
