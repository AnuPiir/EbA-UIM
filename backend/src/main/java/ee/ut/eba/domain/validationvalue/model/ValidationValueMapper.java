package ee.ut.eba.domain.validationvalue.model;

import ee.ut.eba.domain.validationvalue.persistence.ValidationValue;
import java.util.List;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationValueMapper {

	public static List<String> toResponse(List<ValidationValue> validationValues) {
		return validationValues.stream().map(ValidationValue::getName).toList();
	}
}
