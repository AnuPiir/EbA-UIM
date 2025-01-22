"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var feature_pre_condition_service_1 = require("./feature-pre-condition.service");
describe('FeaturePreConditionService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(feature_pre_condition_service_1.FeaturePreConditionService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=feature-pre-condition.service.spec.js.map