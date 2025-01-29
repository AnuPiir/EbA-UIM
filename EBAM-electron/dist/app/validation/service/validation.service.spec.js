import { TestBed } from '@angular/core/testing';
import { ValidationService } from './validation.service.js';
describe('ValidationService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ValidationService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=validation.service.spec.js.map