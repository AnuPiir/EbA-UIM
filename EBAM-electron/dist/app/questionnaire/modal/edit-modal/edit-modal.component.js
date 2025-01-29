"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditModalComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let EditModalComponent = class EditModalComponent {
    constructor(modalRef) {
        this.modalRef = modalRef;
    }
    ngOnInit() {
        this.onClose = new rxjs_1.Subject();
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
tslib_1.__decorate([
    (0, core_1.Input)()
], EditModalComponent.prototype, "name", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], EditModalComponent.prototype, "titleTranslationKey", void 0);
tslib_1.__decorate([
    (0, core_1.Input)()
], EditModalComponent.prototype, "inputTranslationKey", void 0);
EditModalComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-edit-modal',
        templateUrl: './edit-modal.component.html',
        styleUrls: ['./edit-modal.component.css']
    })
], EditModalComponent);
exports.EditModalComponent = EditModalComponent;
//# sourceMappingURL=edit-modal.component.js.map