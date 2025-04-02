package ee.ut.eba.domain.preference.service;

import ee.ut.eba.domain.preference.persistance.Preference;
import ee.ut.eba.domain.preference.persistance.PreferenceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PreferenceService {
	private final PreferenceRepository preferenceRepository;

	public List<Preference> get() {
		return preferenceRepository.findAll();
	}

	public void put(String type, String value) {
		Preference preference = preferenceRepository.findById(type).orElse(new Preference());
		preference.setType(type);
		preference.setValue(value);

		preferenceRepository.save(preference);
	}
}
