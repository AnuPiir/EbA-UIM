package ee.ut.eba.domain.validation.api;

import ee.ut.eba.domain.validation.service.ValidationService;
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
@RequestMapping(value = "/api/validation", produces = MediaType.APPLICATION_JSON_VALUE)
public class ValidationController {

  private final ValidationService validationService;

  @GetMapping
  public List<ValidationResponse> getValidations() {
    log.info("Getting all validations");

    return ValidationMapper.toResponse(validationService.get());
  }
}
