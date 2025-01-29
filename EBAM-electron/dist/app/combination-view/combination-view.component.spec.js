"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const combination_view_component_1 = require("./combination-view.component");
describe('CombinationViewComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [combination_view_component_1.CombinationViewComponent]
        });
        fixture = testing_1.TestBed.createComponent(combination_view_component_1.CombinationViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=combination-view.component.spec.js.map