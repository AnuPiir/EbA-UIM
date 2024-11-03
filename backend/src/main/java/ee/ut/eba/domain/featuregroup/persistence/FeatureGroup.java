package ee.ut.eba.domain.featuregroup.persistence;

import ee.ut.eba.domain.questionnaire.persistence.Questionnaire;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Entity
@Getter
@Setter
@Table(name= FeatureGroup.TABLE)
@ToString
@Accessors(chain = true)
public class FeatureGroup {

  public static final String TABLE = "feature_group";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column
  private String name;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="questionnaire_id")
  private Questionnaire questionnaire;
}
