package ee.ut.eba.domain.validation.service;

import ee.ut.eba.domain.validation.persistence.Validation;
import ee.ut.eba.domain.validation.persistence.ValidationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class ValidationService {

  private final ValidationRepository validationRepository;

  public List<Validation> get() {
    return validationRepository.findAll();
  }

  public Validation getById(Integer id) {
    return validationRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Validation not found with id:" + id));
  }
}
