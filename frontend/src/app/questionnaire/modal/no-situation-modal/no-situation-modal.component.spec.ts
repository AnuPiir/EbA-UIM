// frontend/src/app/questionnaire/modal/no-situation-modal/no-situation-modal.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoSituationModalComponent } from './no-situation-modal.component';
import { BsModalRef } from 'ngx-bootstrap/modal';

describe('NoSituationModalComponent', () => {
    let component: NoSituationModalComponent;
    let fixture: ComponentFixture<NoSituationModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ NoSituationModalComponent ],
            providers: [ BsModalRef ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NoSituationModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit confirmed=true when confirm is called', () => {
        let result: any;
        component.onClose.subscribe((value) => {
            result = value;
        });

        component.confirm();

        expect(result.confirmed).toBe(true);
    });

    it('should emit confirmed=false when cancel is called', () => {
        let result: any;
        component.onClose.subscribe((value) => {
            result = value;
        });

        component.cancel();

        expect(result.confirmed).toBe(false);
    });
});