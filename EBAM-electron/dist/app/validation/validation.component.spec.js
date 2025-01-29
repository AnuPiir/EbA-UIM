"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const validation_component_1 = require("./validation.component");
describe('ValidationComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [validation_component_1.ValidationComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(validation_component_1.ValidationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=validation.component.spec.js.map