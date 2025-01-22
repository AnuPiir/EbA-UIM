"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditModalComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var EditModalComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-edit-modal',
            templateUrl: './edit-modal.component.html',
            styleUrls: ['./edit-modal.component.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _titleTranslationKey_decorators;
    var _titleTranslationKey_initializers = [];
    var _titleTranslationKey_extraInitializers = [];
    var _inputTranslationKey_decorators;
    var _inputTranslationKey_initializers = [];
    var _inputTranslationKey_extraInitializers = [];
    var EditModalComponent = _classThis = /** @class */ (function () {
        function EditModalComponent_1(modalRef) {
            this.modalRef = modalRef;
            this.name = __runInitializers(this, _name_initializers, void 0);
            this.titleTranslationKey = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _titleTranslationKey_initializers, void 0));
            this.inputTranslationKey = (__runInitializers(this, _titleTranslationKey_extraInitializers), __runInitializers(this, _inputTranslationKey_initializers, void 0));
            this.onClose = __runInitializers(this, _inputTranslationKey_extraInitializers);
        }
        EditModalComponent_1.prototype.ngOnInit = function () {
            this.onClose = new rxjs_1.Subject();
        };
        EditModalComponent_1.prototype.close = function () {
            this.onClose.next({ edit: false, newValue: 'null' });
            this.modalRef.hide();
        };
        EditModalComponent_1.prototype.closeAndEdit = function () {
            this.onClose.next({ edit: true, newValue: this.name });
            this.modalRef.hide();
        };
        return EditModalComponent_1;
    }());
    __setFunctionName(_classThis, "EditModalComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, core_1.Input)()];
        _titleTranslationKey_decorators = [(0, core_1.Input)()];
        _inputTranslationKey_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _titleTranslationKey_decorators, { kind: "field", name: "titleTranslationKey", static: false, private: false, access: { has: function (obj) { return "titleTranslationKey" in obj; }, get: function (obj) { return obj.titleTranslationKey; }, set: function (obj, value) { obj.titleTranslationKey = value; } }, metadata: _metadata }, _titleTranslationKey_initializers, _titleTranslationKey_extraInitializers);
        __esDecorate(null, null, _inputTranslationKey_decorators, { kind: "field", name: "inputTranslationKey", static: false, private: false, access: { has: function (obj) { return "inputTranslationKey" in obj; }, get: function (obj) { return obj.inputTranslationKey; }, set: function (obj, value) { obj.inputTranslationKey = value; } }, metadata: _metadata }, _inputTranslationKey_initializers, _inputTranslationKey_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EditModalComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EditModalComponent = _classThis;
}();
exports.EditModalComponent = EditModalComponent;
//# sourceMappingURL=edit-modal.component.js.map