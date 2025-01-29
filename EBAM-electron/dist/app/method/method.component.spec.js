import { TestBed } from '@angular/core/testing';
import { MethodComponent } from './method.component';
describe('MethodComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MethodComponent]
        });
        fixture = TestBed.createComponent(MethodComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=method.component.spec.js.map