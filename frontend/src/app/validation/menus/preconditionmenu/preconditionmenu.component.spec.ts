import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreconditionmenuComponent } from './preconditionmenu.component';

describe('PreconditionmenuComponent', () => {
  let component: PreconditionmenuComponent;
  let fixture: ComponentFixture<PreconditionmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreconditionmenuComponent]
    });
    fixture = TestBed.createComponent(PreconditionmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
