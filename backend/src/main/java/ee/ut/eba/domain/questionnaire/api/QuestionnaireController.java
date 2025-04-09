package ee.ut.eba.domain.questionnaire.api;

import ee.ut.eba.domain.questionnaire.model.QuestionnaireMapper;
import ee.ut.eba.domain.questionnaire.model.QuestionnaireResponse;
import ee.ut.eba.domain.questionnaire.persistence.Questionnaire;
import ee.ut.eba.domain.questionnaire.service.QuestionnaireCopyService;
import ee.ut.eba.domain.questionnaire.service.QuestionnaireDeleteService;
import ee.ut.eba.domain.questionnaire.service.QuestionnaireService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/questionnaire", produces = MediaType.APPLICATION_JSON_VALUE)
public class QuestionnaireController {

	private final QuestionnaireService questionnaireService;
	private final QuestionnaireDeleteService questionnaireDeleteService;
	private final QuestionnaireCopyService questionnaireCopyService;

	@GetMapping
	public List<Questionnaire> getQuestionnaires() {
		log.info("Getting all questionnaires");
		return questionnaireService.get();
	}

	@GetMapping(value = "/{id}")
	public QuestionnaireResponse getQuestionnaire(@PathVariable(value = "id") Integer id) {
		log.info("Getting questionnaire by id: {}", id);
		return QuestionnaireMapper.toResponse(questionnaireService.get(id));
	}

	@PutMapping
	public Questionnaire putQuestionnaire(@RequestBody @Valid Questionnaire questionnaire) {
		log.info("Saving questionnaire: {}", questionnaire);
		return questionnaireService.save(questionnaire);
	}

	@DeleteMapping(value = "/{id}")
	public void deleteQuestionnaire(@PathVariable(value = "id") @NotNull Integer id) {
		log.info("Deleting questionnaire with id: {}", id);
		questionnaireDeleteService.delete(id);
	}

	@GetMapping(value = "/{id}/copy")
	public ResponseEntity<Map<String, Object>> makeCopyOfQuestionnaire(@PathVariable(value = "id") Integer id) {
		log.info("Making a copy of questionnaire with id: {}", id);
		int copyId = questionnaireCopyService.makeCopyOfQuestionnaire(id);
		Map<String, Object> response = new HashMap<>();
		response.put("message", "Questionnaire copied successfully!");
		response.put("id", copyId);
		return ResponseEntity.ok(response);
	}
}
