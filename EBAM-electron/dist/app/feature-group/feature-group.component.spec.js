import { TestBed } from '@angular/core/testing';
import { FeatureGroupComponent } from './feature-group.component';
describe('FeatureGroupComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FeatureGroupComponent]
        });
        fixture = TestBed.createComponent(FeatureGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=feature-group.component.spec.js.map