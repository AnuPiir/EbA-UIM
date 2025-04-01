package ee.ut.eba.domain.questionnaire.model;

import ee.ut.eba.domain.questionnaire.persistence.Questionnaire;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
				questionnaire.getLastModified() != null ? questionnaire.getLastModified() : null, new ArrayList<>());
	}

	public static Questionnaire toQuestionnaire(QuestionnaireRequest questionnaire) {

		return new Questionnaire().setId(questionnaire.getId()).setName(questionnaire.getName())
				.setLastModified(LocalDateTime.now());
	}
}
