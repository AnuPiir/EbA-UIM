package ee.ut.eba.domain.io.model.json;

public record ValidationAnswerJson(Integer id, String answer, Integer rowId, String type, Integer questionaireId,
		ValidationJson validation, FeatureGroupJson featureGroup, FeaturePreconditionJson featurePrecondition,
		FeatureJson feature, StakeholderJson stakeholder, String backgroundColor) {
}
