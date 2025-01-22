"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeholderselectComponent = void 0;
var core_1 = require("@angular/core");
var global_constants_1 = require("../constants/global-constants");
var StakeholderselectComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-stakeholderselect',
            templateUrl: './stakeholderselect.component.html',
            styleUrls: ['./stakeholderselect.component.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _stakeholders_decorators;
    var _stakeholders_initializers = [];
    var _stakeholders_extraInitializers = [];
    var _action_decorators;
    var _action_initializers = [];
    var _action_extraInitializers = [];
    var _closeAction_decorators;
    var _closeAction_initializers = [];
    var _closeAction_extraInitializers = [];
    var _handleClickOutside_decorators;
    var StakeholderselectComponent = _classThis = /** @class */ (function () {
        function StakeholderselectComponent_1(elementRef) {
            this.elementRef = (__runInitializers(this, _instanceExtraInitializers), elementRef);
            this.stakeholders = __runInitializers(this, _stakeholders_initializers, []);
            this.action = (__runInitializers(this, _stakeholders_extraInitializers), __runInitializers(this, _action_initializers, void 0));
            this.closeAction = (__runInitializers(this, _action_extraInitializers), __runInitializers(this, _closeAction_initializers, void 0));
            this.isToggled = (__runInitializers(this, _closeAction_extraInitializers), true);
            this.isFirstClickIgnored = false;
        }
        StakeholderselectComponent_1.prototype.getStakeholderColorClass = function (i) {
            var colorIndex = i % global_constants_1.GlobalConstants.STAKEHOLDER_COLOR_ORDER.length;
            return global_constants_1.GlobalConstants.STAKEHOLDER_COLOR_ORDER[colorIndex];
        };
        StakeholderselectComponent_1.prototype.handleClickOutside = function (event) {
            if (!this.elementRef.nativeElement.contains(event.target)) {
                if (!this.isFirstClickIgnored) {
                    //Required because when opening element also registers this click
                    this.isFirstClickIgnored = true;
                    return;
                }
                this.closeAction.onClick();
            }
        };
        return StakeholderselectComponent_1;
    }());
    __setFunctionName(_classThis, "StakeholderselectComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _stakeholders_decorators = [(0, core_1.Input)()];
        _action_decorators = [(0, core_1.Input)()];
        _closeAction_decorators = [(0, core_1.Input)()];
        _handleClickOutside_decorators = [(0, core_1.HostListener)('document:click', ['$event'])];
        __esDecorate(_classThis, null, _handleClickOutside_decorators, { kind: "method", name: "handleClickOutside", static: false, private: false, access: { has: function (obj) { return "handleClickOutside" in obj; }, get: function (obj) { return obj.handleClickOutside; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _stakeholders_decorators, { kind: "field", name: "stakeholders", static: false, private: false, access: { has: function (obj) { return "stakeholders" in obj; }, get: function (obj) { return obj.stakeholders; }, set: function (obj, value) { obj.stakeholders = value; } }, metadata: _metadata }, _stakeholders_initializers, _stakeholders_extraInitializers);
        __esDecorate(null, null, _action_decorators, { kind: "field", name: "action", static: false, private: false, access: { has: function (obj) { return "action" in obj; }, get: function (obj) { return obj.action; }, set: function (obj, value) { obj.action = value; } }, metadata: _metadata }, _action_initializers, _action_extraInitializers);
        __esDecorate(null, null, _closeAction_decorators, { kind: "field", name: "closeAction", static: false, private: false, access: { has: function (obj) { return "closeAction" in obj; }, get: function (obj) { return obj.closeAction; }, set: function (obj, value) { obj.closeAction = value; } }, metadata: _metadata }, _closeAction_initializers, _closeAction_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StakeholderselectComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StakeholderselectComponent = _classThis;
}();
exports.StakeholderselectComponent = StakeholderselectComponent;
//# sourceMappingURL=stakeholderselect.component.js.map