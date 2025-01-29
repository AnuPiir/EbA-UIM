import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
let DeleteModalComponent = class DeleteModalComponent {
    constructor(modalRef) {
        this.modalRef = modalRef;
        this.questionnaireName = '';
    }
    ngOnInit() {
        this.onClose = new Subject();
    }
    close(deleteObject) {
        this.onClose.next({ deleteObject: deleteObject });
        this.modalRef.hide();
    }
};
__decorate([
    Input()
], DeleteModalComponent.prototype, "isProject", void 0);
__decorate([
    Input()
], DeleteModalComponent.prototype, "isFeatureGroup", void 0);
__decorate([
    Input()
], DeleteModalComponent.prototype, "isStakeholder", void 0);
DeleteModalComponent = __decorate([
    Component({
        selector: 'app-delete-modal',
        templateUrl: './delete-modal.component.html',
        styleUrls: ['./delete-modal.component.css']
    })
], DeleteModalComponent);
export { DeleteModalComponent };
//# sourceMappingURL=delete-modal.component.js.map