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
exports.SelectComponent = void 0;
var core_1 = require("@angular/core");
var validation_value_1 = require("../validation/model/validation-value");
var global_constants_1 = require("../constants/global-constants");
var SelectComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-select',
            templateUrl: './select.component.html',
            styleUrls: ['./select.component.css']
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _selectedValue_decorators;
    var _selectedValue_initializers = [];
    var _selectedValue_extraInitializers = [];
    var _selectionChange_decorators;
    var _selectionChange_initializers = [];
    var _selectionChange_extraInitializers = [];
    var _handleClickOutside_decorators;
    var SelectComponent = _classThis = /** @class */ (function () {
        function SelectComponent_1(elementRef, translateService) {
            this.elementRef = (__runInitializers(this, _instanceExtraInitializers), elementRef);
            this.translateService = translateService;
            this.validationValue2LabelMapping = validation_value_1.ValidationValue2LabelMapping;
            this.validationValues = Object.values(validation_value_1.ValidationValue);
            this.isToggled = false;
            this.selectedValue = __runInitializers(this, _selectedValue_initializers, void 0); // Unique identifier for each instance
            this.selectionChange = (__runInitializers(this, _selectedValue_extraInitializers), __runInitializers(this, _selectionChange_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _selectionChange_extraInitializers);
            this.elementRef = elementRef;
            this.translateService = translateService;
        }
        SelectComponent_1.prototype.toggleSelect = function () {
            this.isToggled = !this.isToggled;
        };
        SelectComponent_1.prototype.customSelectionValue = function () {
            if (!Object.keys(this.validationValue2LabelMapping).includes(this.selectedValue)) {
                if (this.translateService.currentLang === global_constants_1.GlobalConstants.ET) {
                    return "Vali";
                }
                return "Select";
            }
            return 'select.' + this.validationValue2LabelMapping[this.selectedValue];
        };
        SelectComponent_1.prototype.onValueChange = function (validationValue) {
            this.selectedValue = validationValue;
            this.selectionChange.emit(validationValue);
            this.toggleSelect();
        };
        SelectComponent_1.prototype.handleClickOutside = function (event) {
            if (!this.elementRef.nativeElement.contains(event.target)) {
                // Clicked outside of the menu
                this.isToggled = false;
            }
        };
        return SelectComponent_1;
    }());
    __setFunctionName(_classThis, "SelectComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _selectedValue_decorators = [(0, core_1.Input)()];
        _selectionChange_decorators = [(0, core_1.Output)()];
        _handleClickOutside_decorators = [(0, core_1.HostListener)('document:click', ['$event'])];
        __esDecorate(_classThis, null, _handleClickOutside_decorators, { kind: "method", name: "handleClickOutside", static: false, private: false, access: { has: function (obj) { return "handleClickOutside" in obj; }, get: function (obj) { return obj.handleClickOutside; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _selectedValue_decorators, { kind: "field", name: "selectedValue", static: false, private: false, access: { has: function (obj) { return "selectedValue" in obj; }, get: function (obj) { return obj.selectedValue; }, set: function (obj, value) { obj.selectedValue = value; } }, metadata: _metadata }, _selectedValue_initializers, _selectedValue_extraInitializers);
        __esDecorate(null, null, _selectionChange_decorators, { kind: "field", name: "selectionChange", static: false, private: false, access: { has: function (obj) { return "selectionChange" in obj; }, get: function (obj) { return obj.selectionChange; }, set: function (obj, value) { obj.selectionChange = value; } }, metadata: _metadata }, _selectionChange_initializers, _selectionChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SelectComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SelectComponent = _classThis;
}();
exports.SelectComponent = SelectComponent;
//# sourceMappingURL=select.component.js.map