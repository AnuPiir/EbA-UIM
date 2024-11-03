package ee.ut.eba.domain.stakeholder.service;


import ee.ut.eba.domain.questionnaire.service.QuestionnaireService;
import ee.ut.eba.domain.stakeholder.persistence.Stakeholder;
import ee.ut.eba.domain.stakeholder.persistence.StakeholderRepository;
import ee.ut.eba.domain.stakeholder.persistence.StakeholderSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class StakeholderService {

  private final StakeholderRepository stakeholderRepository;
  private final QuestionnaireService questionnaireService;

  public Stakeholder create(CreateParameters createParams) {
    log.info("Creating stakeholder  with params: {}", createParams);

    return stakeholderRepository.save(
      new Stakeholder()
        .setName(createParams.name())
        .setQuestionnaire(questionnaireService.get(createParams.questionnaireId()))
    );
  }

  public List<Stakeholder> getByQuestionnaireId(Integer id) {
    return stakeholderRepository.findAll(StakeholderSpecification.questionnaireId(id));
  }

  public Stakeholder get(Integer id) {
    return stakeholderRepository.findById(id).orElseThrow(
      () -> new NoSuchElementException("Stakeholder not found with id:" + id)
    );
  }

  public record CreateParameters(String name, Integer questionnaireId) {}
}
