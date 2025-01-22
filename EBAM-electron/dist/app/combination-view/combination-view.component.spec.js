"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var combination_view_component_1 = require("./combination-view.component");
describe('CombinationViewComponent', function () {
    var component;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [combination_view_component_1.CombinationViewComponent]
        });
        fixture = testing_1.TestBed.createComponent(combination_view_component_1.CombinationViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=combination-view.component.spec.js.map