import { TestBed } from '@angular/core/testing';
import { EditModalComponent } from './edit-modal.component';
describe('EditModalComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditModalComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(EditModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=edit-modal.component.specs.js.map