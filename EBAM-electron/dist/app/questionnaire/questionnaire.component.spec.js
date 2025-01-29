import { TestBed } from '@angular/core/testing';
import { QuestionnaireComponent } from './questionnaire.component.js';
describe('QuestionnaireComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuestionnaireComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(QuestionnaireComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=questionnaire.component.spec.js.map