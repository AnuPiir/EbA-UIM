package ee.ut.eba.domain.featuregroup.api;

import ee.ut.eba.domain.featuregroup.service.FeatureGroupService;
import ee.ut.eba.domain.featuregroup.service.FeatureGroupUpdateService;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static ee.ut.eba.domain.featuregroup.api.FeatureGroupMapper.toCreateParams;
import static ee.ut.eba.domain.featuregroup.api.FeatureGroupMapper.toResponse;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins =  {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/feature-group", produces = MediaType.APPLICATION_JSON_VALUE)
public class FeatureGroupController {

  private final FeatureGroupService featureGroupService;
  private final FeatureGroupUpdateService featureGroupUpdateService;

  @GetMapping("/questionnaire-id/{questionnaireId}")
  public List<FeatureGroupResponse> get(@PathVariable(value = "questionnaireId") @NotNull Integer id) {
    log.info("Getting feature groups by questionnaire id: {}", id);

    return toResponse(featureGroupService.getByQuestionnaireId(id));
  }

  @PostMapping
  public FeatureGroupResponse create(@RequestBody @Valid FeatureGroupCreateRequest featureGroup) {
    log.info("Creating feature group: {}", featureGroup);

    return toResponse(featureGroupService.create(toCreateParams(featureGroup)));
  }

  @PutMapping("/{id}")
  public FeatureGroupResponse put(
    @PathVariable(value = "id") @NotNull Integer id,
    @RequestBody @Valid FeatureGroupUpdateRequest featureGroup
  ) {
    log.info("Updating feature group with id: {} to feature group: {}",id , featureGroup);

    return toResponse(featureGroupUpdateService.update(id, featureGroup.getName()));
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable(value = "id") @NotNull Integer id) {
    log.info("Deleting feature group with id: {}", id);

    featureGroupService.delete(id);
  }
}
