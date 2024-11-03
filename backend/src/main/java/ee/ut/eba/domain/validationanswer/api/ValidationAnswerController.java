package ee.ut.eba.domain.validationanswer.api;

import ee.ut.eba.domain.validationanswer.service.ValidationAnswerService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static ee.ut.eba.domain.validationanswer.api.ValidationAnswerMapper.toResponse;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins =  {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/validation-answer", produces = MediaType.APPLICATION_JSON_VALUE)
public class ValidationAnswerController {

  private final ValidationAnswerService validationAnswerService;

  @PutMapping
  public ValidationAnswerResponse putValidationAnswer(@RequestBody @Valid ValidationAnswerRequest validationAnswer) {
    log.info("Saving validation answer: {}", validationAnswer);
    return toResponse(validationAnswerService.save(ValidationAnswerMapper.toValidationAnswerSaveParams(validationAnswer)));
  }

  @GetMapping("/questionnaire-id/{questionnaireId}")
  public List<ValidationAnswerResponse> getValidationAnswersByQuestionnaireId(@PathVariable(value = "questionnaireId") @NotNull Integer id) {
    log.info("Getting validation answers by questionnaire id: {}", id);
    return toResponse(validationAnswerService.findByQuestionnaireId(id));
  }

  @GetMapping("/feature-group-id/{featureGroupId}")
  public List<ValidationAnswerResponse> getValidationAnswersByFeatureGroupId(@PathVariable(value = "featureGroupId") @NotNull Integer id) {
    log.info("Getting validation answers by feature group id: {}", id);
    return toResponse(validationAnswerService.findByFeatureGroupId(id));
  }

  @DeleteMapping(value = "/{id}")
  public void deleteValidationAnswer(@PathVariable(value = "id") @NotNull Integer id) {
    log.info("Deleting validation answer with id: {}", id);
    validationAnswerService.delete(id);
  }

  @DeleteMapping(value = "/questionnaire-id/{questionnaireId}/row-id/{rowId}")
  public void deleteValidationAnswerByQuestionnaireIdAndRowId(
    @PathVariable(value = "questionnaireId") @NotNull Integer questionnaireId,
    @PathVariable(value = "rowId") @NotNull Integer rowId
    ) {
    log.info("Deleting validation answer row with questionnaire id: {} and row id: {}", questionnaireId, rowId);
    validationAnswerService.delete(questionnaireId, rowId);
  }
}
