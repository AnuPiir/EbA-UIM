import { TestBed } from '@angular/core/testing';
import { CombinationViewComponent } from './combination-view.component';
describe('CombinationViewComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CombinationViewComponent]
        });
        fixture = TestBed.createComponent(CombinationViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=combination-view.component.spec.js.map