package ee.ut.eba.domain.validationcombinationresult.service;

import ee.ut.eba.domain.validationcombinationresult.persistence.ValidationCombinationResult;
import ee.ut.eba.domain.validationcombinationresult.persistence.ValidationCombinationResultRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ValidationCombinationResultService {

	private final ValidationCombinationResultRepository validationCombinationResultRepository;

	public List<ValidationCombinationResult> get() {
		return validationCombinationResultRepository.findAll();
	}
}
