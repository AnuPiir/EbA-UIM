import { TestBed } from '@angular/core/testing';
import { FeatureGroupService } from './feature-group.service.js';
describe('FeatureGroupService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FeatureGroupService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=feature-group.service.spec.js.map