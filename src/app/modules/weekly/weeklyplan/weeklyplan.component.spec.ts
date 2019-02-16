import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyPlanComponent } from './weeklyplan.component';

describe('WeeklyPlanComponent', () => {
  let component: WeeklyPlanComponent;
  let fixture: ComponentFixture<WeeklyPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
