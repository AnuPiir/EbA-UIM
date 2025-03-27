package ee.ut.eba.domain.questionnaire.service;

import ee.ut.eba.domain.questionnaire.persistence.Questionnaire;
import ee.ut.eba.domain.questionnaire.persistence.QuestionnaireRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionnaireService {

	private final QuestionnaireRepository questionnaireRepository;

	public List<Questionnaire> get() {
		List<Questionnaire> questionnaires = questionnaireRepository.findAll();
		log.info("Retrieved questionnaires with lastModified values: {}", questionnaires.stream()
				.map(q -> q.getId() + ":" + q.getLastModified()).collect(Collectors.joining(", ")));
		return questionnaires;
	}

	public Questionnaire get(Integer id) {
		return questionnaireRepository.findById(id)
				.orElseThrow(() -> new NoSuchElementException("Questionnare not found with id:" + id));
	}

	public Questionnaire save(Questionnaire questionnaire) {
		questionnaire.setLastModified(LocalDateTime.now());
		return questionnaireRepository.save(questionnaire);
	}

	public void delete(Integer id) {
		questionnaireRepository.deleteById(id);
	}
}
