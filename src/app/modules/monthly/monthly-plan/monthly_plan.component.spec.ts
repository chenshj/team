import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPlanComponent } from './monthly_plan.component';

describe('MonthlyPlanComponent', () => {
  let component: MonthlyPlanComponent;
  let fixture: ComponentFixture<MonthlyPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
