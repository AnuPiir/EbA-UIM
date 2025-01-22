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
exports.ValidationService = void 0;
var core_1 = require("@angular/core");
var validation_endpoint_constants_1 = require("../../constants/validation-endpoint-constants");
var ValidationService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ValidationService = _classThis = /** @class */ (function () {
        function ValidationService_1(http) {
            this.http = http;
        }
        ValidationService_1.prototype.getValidations = function () {
            return this.http.get(validation_endpoint_constants_1.ValidationEndpointConstants.getValidationUri());
        };
        ValidationService_1.prototype.getValidationCombinationResults = function () {
            return this.http.get(validation_endpoint_constants_1.ValidationEndpointConstants.getValidationCombinationResultUri());
        };
        ValidationService_1.prototype.getValidationAnswersByQuestionnaireId = function (questionnaireId) {
            return this.http.get(validation_endpoint_constants_1.ValidationEndpointConstants.getValidationAnswersByQuestionnaireIdUri(questionnaireId));
        };
        ValidationService_1.prototype.getValidationAnswersByFeatureGroupId = function (featureGroupId) {
            return this.http.get(validation_endpoint_constants_1.ValidationEndpointConstants.getValidationAnswersByFeatureGroupUri(featureGroupId));
        };
        ValidationService_1.prototype.deleteValidationAnswersByQuestionnaireIdAndRowId = function (questionnaireId, rowId) {
            return this.http.delete(validation_endpoint_constants_1.ValidationEndpointConstants.deleteValidationAnswersByQuestionnaireIdUriAndRowId(questionnaireId, rowId));
        };
        ValidationService_1.prototype.saveValidationAnswer = function (validationAnswer) {
            return this.http.put(validation_endpoint_constants_1.ValidationEndpointConstants.getValidationAnswersUri(), validationAnswer);
        };
        return ValidationService_1;
    }());
    __setFunctionName(_classThis, "ValidationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ValidationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ValidationService = _classThis;
}();
exports.ValidationService = ValidationService;
//# sourceMappingURL=validation.service.js.map