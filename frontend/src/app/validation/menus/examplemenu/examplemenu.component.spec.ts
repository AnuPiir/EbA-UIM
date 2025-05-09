import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplemenuComponent } from './examplemenu.component';

describe('ExamplemenuComponent', () => {
  let component: ExamplemenuComponent;
  let fixture: ComponentFixture<ExamplemenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamplemenuComponent]
    });
    fixture = TestBed.createComponent(ExamplemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
