import { TestBed } from '@angular/core/testing';
import { StakeholderService } from './stakeholder.service.js';
describe('StakeholderService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StakeholderService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=stakeholder.service.spec.js.map