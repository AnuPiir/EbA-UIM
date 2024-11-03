package ee.ut.eba.domain.questionnaire.persistence;

import ee.ut.eba.domain.validationanswer.persistence.ValidationAnswer;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name= Questionnaire.TABLE)
@ToString
@Accessors(chain = true)
public class Questionnaire {

  public static final String TABLE = "questionnaire";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column
  private String name;

  @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "questionnaire")
  private List<ValidationAnswer> validationAnswers = new ArrayList<>();
}
