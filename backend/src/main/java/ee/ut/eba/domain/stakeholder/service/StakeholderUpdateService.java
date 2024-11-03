package ee.ut.eba.domain.stakeholder.service;

import ee.ut.eba.domain.stakeholder.persistence.Stakeholder;
import ee.ut.eba.domain.stakeholder.persistence.StakeholderRepository;
import ee.ut.eba.domain.validationanswer.service.ValidationAnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class StakeholderUpdateService {

  private final StakeholderRepository stakeholderRepository;
  private final ValidationAnswerService validationAnswerService;

  public Stakeholder update(Integer id, String name) {
    Stakeholder stakeholder = stakeholderRepository.findById(id).orElseThrow(
      () -> new NoSuchElementException("Stakeholder not found with id:" + id)
    );
    stakeholder.setName(name);
    stakeholderRepository.save(stakeholder);
    validationAnswerService.updateStakeHolderAnswers(id, name);

    return stakeholder;
  }
}
