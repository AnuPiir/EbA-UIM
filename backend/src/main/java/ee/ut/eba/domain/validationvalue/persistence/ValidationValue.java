package ee.ut.eba.domain.validationvalue.persistence;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name= ValidationValue.TABLE)
@ToString
public class ValidationValue {

  public static final String TABLE = "validation_value";

  @Id
  private String name;
}
