"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const feature_group_component_1 = require("./feature-group.component");
describe('FeatureGroupComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [feature_group_component_1.FeatureGroupComponent]
        });
        fixture = testing_1.TestBed.createComponent(feature_group_component_1.FeatureGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=feature-group.component.spec.js.map