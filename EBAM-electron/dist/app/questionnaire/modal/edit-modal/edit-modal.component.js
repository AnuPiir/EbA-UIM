import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
let EditModalComponent = class EditModalComponent {
    constructor(modalRef) {
        this.modalRef = modalRef;
    }
    ngOnInit() {
        this.onClose = new Subject();
    }
    close() {
        this.onClose.next({ edit: false, newValue: 'null' });
        this.modalRef.hide();
    }
    closeAndEdit() {
        this.onClose.next({ edit: true, newValue: this.name });
        this.modalRef.hide();
    }
};
__decorate([
    Input()
], EditModalComponent.prototype, "name", void 0);
__decorate([
    Input()
], EditModalComponent.prototype, "titleTranslationKey", void 0);
__decorate([
    Input()
], EditModalComponent.prototype, "inputTranslationKey", void 0);
EditModalComponent = __decorate([
    Component({
        selector: 'app-edit-modal',
        templateUrl: './edit-modal.component.html',
        styleUrls: ['./edit-modal.component.css']
    })
], EditModalComponent);
export { EditModalComponent };
//# sourceMappingURL=edit-modal.component.js.map