package ee.ut.eba.domain.validationcombination.service;

import ee.ut.eba.domain.validationcombination.persistence.ValidationCombination;
import ee.ut.eba.domain.validationcombination.persistence.ValidationCombinationRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ValidationCombinationService {

	private final ValidationCombinationRepository validationCombinationRepository;

	public List<ValidationCombination> get() {
		return validationCombinationRepository.findAll();
	}
}
