// frontend/src/app/questionnaire/modal/no-situation-modal/no-situation-modal.component.ts
import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-no-situation-modal',
    templateUrl: './no-situation-modal.component.html',
    styleUrls: ['./no-situation-modal.component.css']
})
export class NoSituationModalComponent {
    @Input() title: string = '';
    @Input() message: string = '';
    @Input() confirmButton: string = 'OK';
    @Input() cancelButton: string = 'Cancel';

    public onClose: Subject<{ confirmed: boolean }>;

    constructor(private modalRef: BsModalRef) {
        this.onClose = new Subject();
    }

    confirm(): void {
        this.onClose.next({ confirmed: true });
        this.modalRef.hide();
    }

    cancel(): void {
        this.onClose.next({ confirmed: false });
        this.modalRef.hide();
    }
}