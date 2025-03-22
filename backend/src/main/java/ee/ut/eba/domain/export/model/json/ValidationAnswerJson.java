package ee.ut.eba.domain.export.model.json;

import ee.ut.eba.domain.featureprecondition.persistence.FeaturePrecondition;
import ee.ut.eba.domain.stakeholder.persistence.Stakeholder;
import ee.ut.eba.domain.validation.persistence.Validation;

public record ValidationAnswerJson (
        Integer id,
        String answer,
        Integer rowId,
        String type,
        Integer questionaireId,
        ValidationJson validation,
        FeatureGroupJson featureGroupId,
        FeaturePreconditionJson featurePrecondition,
        FeatureJson feature,
        StakeholderJson stakeholder,
        String backgroundColor

){}
