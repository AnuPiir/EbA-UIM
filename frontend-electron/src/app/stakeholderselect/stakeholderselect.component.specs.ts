import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StakeholderselectComponent } from './stakeholderselect.component';

describe('StakeholderselectComponent', () => {
  let component: StakeholderselectComponent;
  let fixture: ComponentFixture<StakeholderselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeholderselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});