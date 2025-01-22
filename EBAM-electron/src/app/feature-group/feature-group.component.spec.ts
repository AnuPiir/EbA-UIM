import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureGroupComponent } from './feature-group.component';

describe('FeatureGroupComponent', () => {
  let component: FeatureGroupComponent;
  let fixture: ComponentFixture<FeatureGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureGroupComponent]
    });
    fixture = TestBed.createComponent(FeatureGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
