"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const delete_modal_component_1 = require("./delete-modal.component");
describe('DeleteModalComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [delete_modal_component_1.DeleteModalComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(delete_modal_component_1.DeleteModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=delete-modal.component.spec.js.map