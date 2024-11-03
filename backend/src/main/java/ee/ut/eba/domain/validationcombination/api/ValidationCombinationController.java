package ee.ut.eba.domain.validationcombination.api;

import ee.ut.eba.domain.validationcombination.service.ValidationCombinationService;
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
@RequestMapping(value = "/api/validation-combination", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
public class ValidationCombinationController {

  private final ValidationCombinationService validationCombinationService;

  @GetMapping
  public List<ValidationCombinationResponse> getValidationCombinations() {
    log.info("Getting validation combinations");

    return ValidationCombinationMapper.toResponse(validationCombinationService.get());
  }
}
