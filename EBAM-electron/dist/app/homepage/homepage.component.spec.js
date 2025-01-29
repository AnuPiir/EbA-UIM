"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const homepage_component_1 = require("./homepage.component");
describe('HomepageComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            declarations: [homepage_component_1.HomepageComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(homepage_component_1.HomepageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=homepage.component.spec.js.map