package ee.ut.eba.domain.io.api;

import ee.ut.eba.domain.io.model.json.QuestionaireJson;
import ee.ut.eba.domain.io.service.ImportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/import", produces = MediaType.APPLICATION_JSON_VALUE)
public class ImportController {

	private final ImportService importService;

	@PostMapping(value = "json")
	public ResponseEntity<Map<String, Object>> importQuestionnaire(@RequestBody QuestionaireJson jsonData) {
		int id = importService.importQuestionnaire(jsonData);
		Map<String, Object> response = new HashMap<>();
		response.put("message", "Questionnaire imported successfully!");
		response.put("id", id);
		return ResponseEntity.ok(response);
	}
}
