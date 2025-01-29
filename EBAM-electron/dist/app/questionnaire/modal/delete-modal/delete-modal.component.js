"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteModalComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let DeleteModalComponent = class DeleteModalComponent {
    constructor(modalRef) {
        this.modalRef = modalRef;
        this.questionnaireName = '';
    }
    ngOnInit() {
        this.onClose = new rxjs_1.Subject();
    }
    close(deleteObject) {
        this.onClose.next({ deleteObject: deleteObject });
        this.modalRef.hide();
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], DeleteModalComponent.prototype, "isProject", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], DeleteModalComponent.prototype, "isFeatureGroup", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], DeleteModalComponent.prototype, "isStakeholder", void 0);
DeleteModalComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-delete-modal',
        templateUrl: './delete-modal.component.html',
        styleUrls: ['./delete-modal.component.css']
    })
], DeleteModalComponent);
exports.DeleteModalComponent = DeleteModalComponent;
//# sourceMappingURL=delete-modal.component.js.map