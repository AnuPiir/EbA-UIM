package ee.ut.eba.domain.export.model.json;

import lombok.Value;

import java.util.List;
import java.util.stream.Stream;

public record QuestionaireJson(
        String name,
        List<ValidationAnswerJson> validationAnswers
) {
}
