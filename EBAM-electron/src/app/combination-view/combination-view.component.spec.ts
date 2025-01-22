import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinationViewComponent } from './combination-view.component';

describe('CombinationViewComponent', () => {
  let component: CombinationViewComponent;
  let fixture: ComponentFixture<CombinationViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CombinationViewComponent]
    });
    fixture = TestBed.createComponent(CombinationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
