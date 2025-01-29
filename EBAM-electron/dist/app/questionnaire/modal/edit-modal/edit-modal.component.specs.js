"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const edit_modal_component_1 = require("./edit-modal.component");
describe('EditModalComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [edit_modal_component_1.EditModalComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(edit_modal_component_1.EditModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=edit-modal.component.specs.js.map