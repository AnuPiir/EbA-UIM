package ee.ut.eba.domain.validationcombinationresult.api;

import ee.ut.eba.domain.validationcombinationresult.service.ValidationCombinationResultService;
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
@RequestMapping(value = "/api/validation-combination-result", produces = MediaType.APPLICATION_JSON_VALUE)
public class ValidationCombinationResultController {

  private final ValidationCombinationResultService validationCombinationResultService;

  @GetMapping
  public List<ValidationCombinationResultResponse> getValidationCombinationResults() {
    log.info("Getting validation combination results");

    return ValidationCombinationResultMapper.toResponse(validationCombinationResultService.get());
  }
}
