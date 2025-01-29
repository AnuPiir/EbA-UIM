import { TestBed } from '@angular/core/testing';
import { DeleteModalComponent } from './delete-modal.component.js';
describe('DeleteModalComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DeleteModalComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(DeleteModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=delete-modal.component.spec.js.map