package ee.ut.eba.domain.validationcombinationresult.persistence;

import ee.ut.eba.domain.validationcombination.persistence.ValidationCombination;
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

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name= ValidationCombinationResult.TABLE)
@ToString
public class ValidationCombinationResult {

  public static final String TABLE = "validation_combination_result";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column
  private String resultEn;

  @Column
  private String resultEt;

  @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "validationCombinationResult")
  private List<ValidationCombination> validationCombinations = new ArrayList<>();
}
