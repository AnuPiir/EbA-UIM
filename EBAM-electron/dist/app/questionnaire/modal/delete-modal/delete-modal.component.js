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
exports.DeleteModalComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var DeleteModalComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-delete-modal',
            templateUrl: './delete-modal.component.html',
            styleUrls: ['./delete-modal.component.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _isProject_decorators;
    var _isProject_initializers = [];
    var _isProject_extraInitializers = [];
    var _isFeatureGroup_decorators;
    var _isFeatureGroup_initializers = [];
    var _isFeatureGroup_extraInitializers = [];
    var _isStakeholder_decorators;
    var _isStakeholder_initializers = [];
    var _isStakeholder_extraInitializers = [];
    var DeleteModalComponent = _classThis = /** @class */ (function () {
        function DeleteModalComponent_1(modalRef) {
            this.modalRef = modalRef;
            this.isProject = __runInitializers(this, _isProject_initializers, void 0);
            this.isFeatureGroup = (__runInitializers(this, _isProject_extraInitializers), __runInitializers(this, _isFeatureGroup_initializers, void 0));
            this.isStakeholder = (__runInitializers(this, _isFeatureGroup_extraInitializers), __runInitializers(this, _isStakeholder_initializers, void 0));
            this.questionnaireName = (__runInitializers(this, _isStakeholder_extraInitializers), '');
        }
        DeleteModalComponent_1.prototype.ngOnInit = function () {
            this.onClose = new rxjs_1.Subject();
        };
        DeleteModalComponent_1.prototype.close = function (deleteObject) {
            this.onClose.next({ deleteObject: deleteObject });
            this.modalRef.hide();
        };
        return DeleteModalComponent_1;
    }());
    __setFunctionName(_classThis, "DeleteModalComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _isProject_decorators = [(0, core_1.Input)()];
        _isFeatureGroup_decorators = [(0, core_1.Input)()];
        _isStakeholder_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _isProject_decorators, { kind: "field", name: "isProject", static: false, private: false, access: { has: function (obj) { return "isProject" in obj; }, get: function (obj) { return obj.isProject; }, set: function (obj, value) { obj.isProject = value; } }, metadata: _metadata }, _isProject_initializers, _isProject_extraInitializers);
        __esDecorate(null, null, _isFeatureGroup_decorators, { kind: "field", name: "isFeatureGroup", static: false, private: false, access: { has: function (obj) { return "isFeatureGroup" in obj; }, get: function (obj) { return obj.isFeatureGroup; }, set: function (obj, value) { obj.isFeatureGroup = value; } }, metadata: _metadata }, _isFeatureGroup_initializers, _isFeatureGroup_extraInitializers);
        __esDecorate(null, null, _isStakeholder_decorators, { kind: "field", name: "isStakeholder", static: false, private: false, access: { has: function (obj) { return "isStakeholder" in obj; }, get: function (obj) { return obj.isStakeholder; }, set: function (obj, value) { obj.isStakeholder = value; } }, metadata: _metadata }, _isStakeholder_initializers, _isStakeholder_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DeleteModalComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DeleteModalComponent = _classThis;
}();
exports.DeleteModalComponent = DeleteModalComponent;
//# sourceMappingURL=delete-modal.component.js.map