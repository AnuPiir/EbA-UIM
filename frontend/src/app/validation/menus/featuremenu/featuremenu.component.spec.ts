import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturemenuComponent } from './featuremenu.component';

describe('FeaturemenuComponent', () => {
  let component: FeaturemenuComponent;
  let fixture: ComponentFixture<FeaturemenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturemenuComponent]
    });
    fixture = TestBed.createComponent(FeaturemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
