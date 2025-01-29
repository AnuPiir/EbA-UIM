import { TestBed } from '@angular/core/testing';
import { FeaturePreConditionService } from './feature-pre-condition.service.js';
describe('FeaturePreConditionService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FeaturePreConditionService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=feature-pre-condition.service.spec.js.map