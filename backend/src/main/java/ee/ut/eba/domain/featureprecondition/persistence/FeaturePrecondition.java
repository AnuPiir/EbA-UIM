package ee.ut.eba.domain.featureprecondition.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Entity
@Getter
@Setter
@Table(name= FeaturePrecondition.TABLE)
@ToString
@Accessors(chain = true)
public class FeaturePrecondition {

  public static final String TABLE = "feature_precondition";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column
  private String answer;
}
