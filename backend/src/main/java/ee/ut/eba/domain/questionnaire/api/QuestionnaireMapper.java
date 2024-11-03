package ee.ut.eba.domain.questionnaire.api;

import ee.ut.eba.domain.questionnaire.persistence.Questionnaire;
import ee.ut.eba.domain.validationanswer.api.ValidationAnswerMapper;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class QuestionnaireMapper {

  public static List<QuestionnaireResponse> toResponse(List<Questionnaire> questionnaires) {
    return questionnaires.stream().map(QuestionnaireMapper::toResponse).toList();
  }

  public static QuestionnaireResponse toResponse(Questionnaire questionnaire) {
    return new QuestionnaireResponse(
      questionnaire.getId(),
      questionnaire.getName(),
      questionnaire.getValidationAnswers().stream().map(ValidationAnswerMapper::toResponse).toList()
    );
  }

  public static Questionnaire toQuestionnaire(QuestionnaireRequest questionnaire) {
    return new Questionnaire().setId(questionnaire.getId()).setName(questionnaire.getName());
  }
}
