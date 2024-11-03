package ee.ut.eba.domain.questionnaire.service;

import ee.ut.eba.domain.questionnaire.persistence.Questionnaire;
import ee.ut.eba.domain.questionnaire.persistence.QuestionnaireRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionnaireService {

  private final QuestionnaireRepository questionnaireRepository;

  public List<Questionnaire> get() {
    return questionnaireRepository.findAll();
  }

  public Questionnaire get(Integer id) {
    return questionnaireRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Questionnare not found with id:" + id));
  }

  public void save(Questionnaire questionnaire) {
    questionnaireRepository.save(questionnaire);
  }

  public void delete(Integer id) {
    questionnaireRepository.deleteById(id);
  }
}
