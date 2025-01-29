"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const toolbar_component_1 = require("./toolbar.component");
describe('ToolbarComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [toolbar_component_1.ToolbarComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(toolbar_component_1.ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=toolbar.component.spec.js.map