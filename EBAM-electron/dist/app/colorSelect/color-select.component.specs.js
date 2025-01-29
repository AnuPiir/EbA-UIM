import { TestBed } from '@angular/core/testing';
import { ColorSelectComponent } from './color-select.component.js';
describe('ColorSelectComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ColorSelectComponent]
        })
            .compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(ColorSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=color-select.component.specs.js.map