package ee.ut.eba.domain.stakeholder.api;

import static ee.ut.eba.domain.stakeholder.model.StakeholderMapper.toCreateParams;
import static ee.ut.eba.domain.stakeholder.model.StakeholderMapper.toResponse;

import ee.ut.eba.domain.questionnaire.service.QuestionnaireService;
import ee.ut.eba.domain.stakeholder.model.StakeholderCreateRequest;
import ee.ut.eba.domain.stakeholder.model.StakeholderResponse;
import ee.ut.eba.domain.stakeholder.model.StakeholderUpdateRequest;
import ee.ut.eba.domain.stakeholder.service.StakeholderDeleteService;
import ee.ut.eba.domain.stakeholder.service.StakeholderService;
import ee.ut.eba.domain.stakeholder.service.StakeholderUpdateService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
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

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/stakeholder", produces = MediaType.APPLICATION_JSON_VALUE)
public class StakeholderController {

	private final StakeholderService stakeholderService;
	private final StakeholderDeleteService stakeholderDeleteService;
	private final StakeholderUpdateService stakeholderUpdateService;
	private final QuestionnaireService questionnaireService;

	@GetMapping("/questionnaire-id/{questionnaireId}")
	public List<StakeholderResponse> get(@PathVariable(value = "questionnaireId") @NotNull Integer id) {
		log.info("Getting stakeholders by questionnaire id: {}", id);

		return toResponse(stakeholderService.getByQuestionnaireId(id));
	}

	@PostMapping
	public StakeholderResponse create(@RequestBody @Valid StakeholderCreateRequest stakeholder) {
		log.info("Creating stakeholder: {}", stakeholder);
		questionnaireService.questionnaireUpdated(stakeholder.getQuestionnaireId());
		return toResponse(stakeholderService.create(toCreateParams(stakeholder)));
	}

	@PutMapping("/{id}")
	public StakeholderResponse put(@PathVariable(value = "id") @NotNull Integer id,
			@RequestBody @Valid StakeholderUpdateRequest stakeholder) {
		log.info("Updating stakeholder with id: {}, to :{}", id, stakeholder);

		return toResponse(stakeholderUpdateService.update(id, stakeholder.getName()));
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable(value = "id") @NotNull Integer id) {
		log.info("Deleting stakeholder with id: {}", id);

		stakeholderDeleteService.deleteAndRemoveFromValidationAnswers(id);
	}
}
