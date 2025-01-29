import { TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
describe('HomepageComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomepageComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(HomepageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=homepage.component.spec.js.map