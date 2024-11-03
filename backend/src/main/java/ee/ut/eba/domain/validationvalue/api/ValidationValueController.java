package ee.ut.eba.domain.validationvalue.api;

import ee.ut.eba.domain.validationvalue.service.ValidationValueService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins =  {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/validation-value", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
public class ValidationValueController {

  private final ValidationValueService validationValueService;

  @GetMapping
  public List<String> getValidationValues() {
    log.info("Getting all validation values");

    return ValidationValueMapper.toResponse(validationValueService.get());
  }
}
