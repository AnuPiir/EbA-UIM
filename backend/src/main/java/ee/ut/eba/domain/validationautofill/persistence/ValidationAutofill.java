package ee.ut.eba.domain.validationautofill.persistence;

import ee.ut.eba.domain.validation.persistence.Validation;
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

@Entity
@Getter
@Setter
@Table(name= ValidationAutofill.TABLE)
@ToString
public class ValidationAutofill {

  public static final String TABLE = "validation_autofill";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column
  private Integer weight;

  @Column
  private String placeholder;

  @Column
  private String type;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="validation_to_fill_id")
  private Validation validationToFill;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="validation_filled_by_id")
  private Validation validationFilledBy;
}
