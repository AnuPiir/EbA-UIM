package ee.ut.eba.domain.validation.api;

import ee.ut.eba.domain.validation.persistence.Validation;
import ee.ut.eba.domain.validationautofill.persistence.ValidationAutofill;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ValidationMapper {

  public static List<ValidationResponse> toResponse(List<Validation> validations) {
    return validations.stream().map(ValidationMapper::toResponse).toList();
  }

  public static ValidationResponse toResponse(Validation validation) {
    return new ValidationResponse(
      validation.getId(),
      validation.getNameEt(),
      validation.getNameEn(),
      validation.getTooltipEt(),
      validation.getTooltipEn(),
      validation.getWeight(),
      validation.getType(),
      validation.getValidationAutofills().stream().map(ValidationMapper::toResponse).toList()
    );
  }

  public static ValidationResponse.ValidationAutofill toResponse(ValidationAutofill validationAutofill) {
    return new ValidationResponse.ValidationAutofill(
      validationAutofill.getValidationFilledBy() != null ? validationAutofill.getValidationFilledBy().getId() : null,
      validationAutofill.getWeight(),
      validationAutofill.getPlaceholder(),
      validationAutofill.getType()
    );
  }
}
