package ee.ut.eba.domain.validationvalue.api;

import ee.ut.eba.domain.validationvalue.persistence.ValidationValue;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationValueMapper {

  public static List<String> toResponse(List<ValidationValue> validationValues) {
    return validationValues.stream().map(ValidationValue::getName).toList();
  }
}
