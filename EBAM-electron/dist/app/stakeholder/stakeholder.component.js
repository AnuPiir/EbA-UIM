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
exports.StakeholderComponent = void 0;
var core_1 = require("@angular/core");
var StakeholderComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-stakeholder',
            templateUrl: './stakeholder.component.html',
            styleUrls: ['./stakeholder.component.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _stakeholder_decorators;
    var _stakeholder_initializers = [];
    var _stakeholder_extraInitializers = [];
    var _color_decorators;
    var _color_initializers = [];
    var _color_extraInitializers = [];
    var _editAction_decorators;
    var _editAction_initializers = [];
    var _editAction_extraInitializers = [];
    var _deleteAction_decorators;
    var _deleteAction_initializers = [];
    var _deleteAction_extraInitializers = [];
    var StakeholderComponent = _classThis = /** @class */ (function () {
        function StakeholderComponent_1() {
            this.stakeholder = __runInitializers(this, _stakeholder_initializers, void 0);
            this.color = (__runInitializers(this, _stakeholder_extraInitializers), __runInitializers(this, _color_initializers, void 0));
            this.editAction = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _editAction_initializers, void 0));
            this.deleteAction = (__runInitializers(this, _editAction_extraInitializers), __runInitializers(this, _deleteAction_initializers, void 0));
            this.isToggled = (__runInitializers(this, _deleteAction_extraInitializers), false);
        }
        StakeholderComponent_1.prototype.toggleMenu = function () {
            this.isToggled = !this.isToggled;
        };
        return StakeholderComponent_1;
    }());
    __setFunctionName(_classThis, "StakeholderComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _stakeholder_decorators = [(0, core_1.Input)()];
        _color_decorators = [(0, core_1.Input)()];
        _editAction_decorators = [(0, core_1.Input)()];
        _deleteAction_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _stakeholder_decorators, { kind: "field", name: "stakeholder", static: false, private: false, access: { has: function (obj) { return "stakeholder" in obj; }, get: function (obj) { return obj.stakeholder; }, set: function (obj, value) { obj.stakeholder = value; } }, metadata: _metadata }, _stakeholder_initializers, _stakeholder_extraInitializers);
        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: function (obj) { return "color" in obj; }, get: function (obj) { return obj.color; }, set: function (obj, value) { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
        __esDecorate(null, null, _editAction_decorators, { kind: "field", name: "editAction", static: false, private: false, access: { has: function (obj) { return "editAction" in obj; }, get: function (obj) { return obj.editAction; }, set: function (obj, value) { obj.editAction = value; } }, metadata: _metadata }, _editAction_initializers, _editAction_extraInitializers);
        __esDecorate(null, null, _deleteAction_decorators, { kind: "field", name: "deleteAction", static: false, private: false, access: { has: function (obj) { return "deleteAction" in obj; }, get: function (obj) { return obj.deleteAction; }, set: function (obj, value) { obj.deleteAction = value; } }, metadata: _metadata }, _deleteAction_initializers, _deleteAction_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StakeholderComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StakeholderComponent = _classThis;
}();
exports.StakeholderComponent = StakeholderComponent;
//# sourceMappingURL=stakeholder.component.js.map