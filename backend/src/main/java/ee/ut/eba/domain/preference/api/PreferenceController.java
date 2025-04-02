package ee.ut.eba.domain.preference.api;

import ee.ut.eba.domain.preference.persistance.Preference;
import ee.ut.eba.domain.preference.service.PreferenceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"${app.dev.frontend.local}"})
@RequestMapping(value = "/api/preference", produces = MediaType.APPLICATION_JSON_VALUE)
public class PreferenceController {

	private final PreferenceService preferenceService;

	@GetMapping
	public List<Preference> getPreferences() {
		return preferenceService.get();
	}

	@PostMapping(value = "/type/{type}/value/{value}")
	public void updateOrAddPreference(@PathVariable String type, @PathVariable String value) {
		preferenceService.put(type, value);
	}

}
