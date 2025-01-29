"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const questionnaire_component_1 = require("./questionnaire.component");
describe('QuestionnaireComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [questionnaire_component_1.QuestionnaireComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(questionnaire_component_1.QuestionnaireComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=questionnaire.component.spec.js.map