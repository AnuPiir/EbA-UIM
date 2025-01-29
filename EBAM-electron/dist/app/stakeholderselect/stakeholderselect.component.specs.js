import { TestBed } from '@angular/core/testing';
import { StakeholderselectComponent } from './stakeholderselect.component.js';
describe('StakeholderselectComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StakeholderselectComponent]
        })
            .compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(StakeholderselectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=stakeholderselect.component.specs.js.map