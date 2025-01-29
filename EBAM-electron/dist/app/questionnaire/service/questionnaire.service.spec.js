import { TestBed } from '@angular/core/testing';
import { QuestionnaireService } from './questionnaire.service.js';
describe('QuestionnaireService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(QuestionnaireService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=questionnaire.service.spec.js.map