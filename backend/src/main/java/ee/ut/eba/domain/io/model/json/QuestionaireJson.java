package ee.ut.eba.domain.io.model.json;

import java.util.List;

public record QuestionaireJson(String name, List<ValidationAnswerJson> validationAnswers) {
}
