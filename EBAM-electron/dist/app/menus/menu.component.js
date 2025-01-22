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
exports.MenuComponent = void 0;
var core_1 = require("@angular/core");
var MenuComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-menu',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _icon_decorators;
    var _icon_initializers = [];
    var _icon_extraInitializers = [];
    var _actions_decorators;
    var _actions_initializers = [];
    var _actions_extraInitializers = [];
    var _returnAction_decorators;
    var _returnAction_initializers = [];
    var _returnAction_extraInitializers = [];
    var _stakeholders_decorators;
    var _stakeholders_initializers = [];
    var _stakeholders_extraInitializers = [];
    var _toggle_decorators;
    var _toggle_initializers = [];
    var _toggle_extraInitializers = [];
    var _isStakeholdersCell_decorators;
    var _isStakeholdersCell_initializers = [];
    var _isStakeholdersCell_extraInitializers = [];
    var _handleClickOutside_decorators;
    var MenuComponent = _classThis = /** @class */ (function () {
        function MenuComponent_1(elementRef) {
            this.elementRef = (__runInitializers(this, _instanceExtraInitializers), elementRef);
            this.icon = __runInitializers(this, _icon_initializers, void 0);
            this.actions = (__runInitializers(this, _icon_extraInitializers), __runInitializers(this, _actions_initializers, []));
            this.returnAction = (__runInitializers(this, _actions_extraInitializers), __runInitializers(this, _returnAction_initializers, void 0));
            this.stakeholders = (__runInitializers(this, _returnAction_extraInitializers), __runInitializers(this, _stakeholders_initializers, void 0));
            this.toggle = (__runInitializers(this, _stakeholders_extraInitializers), __runInitializers(this, _toggle_initializers, void 0));
            this.isStakeholdersCell = (__runInitializers(this, _toggle_extraInitializers), __runInitializers(this, _isStakeholdersCell_initializers, void 0));
            this.isToggled = (__runInitializers(this, _isStakeholdersCell_extraInitializers), false);
            this.stakeholderListToggled = false;
            this.colorListToggled = false;
        }
        MenuComponent_1.prototype.toggleMenu = function (component) {
            if (component == "Menu") {
                if (this.stakeholderListToggled == true) {
                    this.isToggled = false;
                    this.stakeholderListToggled = !this.stakeholderListToggled;
                }
                else {
                    this.isToggled = !this.isToggled;
                }
            }
            else if (component == "Stakeholders") {
                this.isToggled = false;
                this.stakeholderListToggled = !this.stakeholderListToggled;
            }
            else if (component == "Colors") {
                this.colorListToggled = !this.colorListToggled;
            }
        };
        MenuComponent_1.prototype.stakeHolderAction = function () {
            var _this = this;
            return { onClick: function (stakeHolder) { return _this.returnStakeHolder(stakeHolder); } };
        };
        MenuComponent_1.prototype.returnStakeHolder = function (stakeHolder) {
            this.returnAction(stakeHolder);
        };
        MenuComponent_1.prototype.handleClickOutside = function (event) {
            if (!this.elementRef.nativeElement.contains(event.target)) {
                // Clicked outside of the menu
                this.isToggled = false;
            }
        };
        MenuComponent_1.prototype.stakeHolderCloseAction = function () {
            var _this = this;
            return { onClick: function () { return _this.stakeholderListToggled = false; } };
        };
        return MenuComponent_1;
    }());
    __setFunctionName(_classThis, "MenuComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _icon_decorators = [(0, core_1.Input)()];
        _actions_decorators = [(0, core_1.Input)()];
        _returnAction_decorators = [(0, core_1.Input)()];
        _stakeholders_decorators = [(0, core_1.Input)()];
        _toggle_decorators = [(0, core_1.Input)()];
        _isStakeholdersCell_decorators = [(0, core_1.Input)()];
        _handleClickOutside_decorators = [(0, core_1.HostListener)('document:click', ['$event'])];
        __esDecorate(_classThis, null, _handleClickOutside_decorators, { kind: "method", name: "handleClickOutside", static: false, private: false, access: { has: function (obj) { return "handleClickOutside" in obj; }, get: function (obj) { return obj.handleClickOutside; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _icon_decorators, { kind: "field", name: "icon", static: false, private: false, access: { has: function (obj) { return "icon" in obj; }, get: function (obj) { return obj.icon; }, set: function (obj, value) { obj.icon = value; } }, metadata: _metadata }, _icon_initializers, _icon_extraInitializers);
        __esDecorate(null, null, _actions_decorators, { kind: "field", name: "actions", static: false, private: false, access: { has: function (obj) { return "actions" in obj; }, get: function (obj) { return obj.actions; }, set: function (obj, value) { obj.actions = value; } }, metadata: _metadata }, _actions_initializers, _actions_extraInitializers);
        __esDecorate(null, null, _returnAction_decorators, { kind: "field", name: "returnAction", static: false, private: false, access: { has: function (obj) { return "returnAction" in obj; }, get: function (obj) { return obj.returnAction; }, set: function (obj, value) { obj.returnAction = value; } }, metadata: _metadata }, _returnAction_initializers, _returnAction_extraInitializers);
        __esDecorate(null, null, _stakeholders_decorators, { kind: "field", name: "stakeholders", static: false, private: false, access: { has: function (obj) { return "stakeholders" in obj; }, get: function (obj) { return obj.stakeholders; }, set: function (obj, value) { obj.stakeholders = value; } }, metadata: _metadata }, _stakeholders_initializers, _stakeholders_extraInitializers);
        __esDecorate(null, null, _toggle_decorators, { kind: "field", name: "toggle", static: false, private: false, access: { has: function (obj) { return "toggle" in obj; }, get: function (obj) { return obj.toggle; }, set: function (obj, value) { obj.toggle = value; } }, metadata: _metadata }, _toggle_initializers, _toggle_extraInitializers);
        __esDecorate(null, null, _isStakeholdersCell_decorators, { kind: "field", name: "isStakeholdersCell", static: false, private: false, access: { has: function (obj) { return "isStakeholdersCell" in obj; }, get: function (obj) { return obj.isStakeholdersCell; }, set: function (obj, value) { obj.isStakeholdersCell = value; } }, metadata: _metadata }, _isStakeholdersCell_initializers, _isStakeholdersCell_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MenuComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MenuComponent = _classThis;
}();
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map