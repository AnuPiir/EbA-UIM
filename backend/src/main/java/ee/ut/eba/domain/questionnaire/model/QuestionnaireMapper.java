package ee.ut.eba.domain.questionnaire.model;

import ee.ut.eba.domain.questionnaire.persistence.Questionnaire;
import ee.ut.eba.domain.validationanswer.model.ValidationAnswerMapper;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class QuestionnaireMapper {

	public static List<QuestionnaireResponse> toResponse(List<Questionnaire> questionnaires) {
		return questionnaires.stream().map(QuestionnaireMapper::toResponse).toList();
	}

	public static QuestionnaireResponse toResponse(Questionnaire questionnaire) {
		return new QuestionnaireResponse(questionnaire.getId(), questionnaire.getName(),
				questionnaire.getLastModified() != null ? questionnaire.getLastModified() : null,
				questionnaire.getValidationAnswers().stream().map(ValidationAnswerMapper::toResponse).toList());
	}

	public static Questionnaire toQuestionnaire(QuestionnaireRequest questionnaire) {
		Questionnaire entity = new Questionnaire().setId(questionnaire.getId()).setName(questionnaire.getName());

		// Preserve last modified if it exists, otherwise set to now
		if (questionnaire.getId() != null) {
			// Update
			entity.setLastModified(LocalDateTime.now());
		} else {
			// New questionnaire
			entity.setLastModified(LocalDateTime.now());
		}

		return entity;
	}
}
