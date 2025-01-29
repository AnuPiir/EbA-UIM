import { TestBed } from '@angular/core/testing';
import { FeatureService } from './feature.service.js';
describe('FeatureService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FeatureService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=feature.service.spec.js.map