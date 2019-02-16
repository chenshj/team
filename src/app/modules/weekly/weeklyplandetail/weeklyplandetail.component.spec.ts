import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyPlanDetailComponent } from './weeklyplandetail.component';

describe('WeeklyPlanDetailComponent', () => {
  let component: WeeklyPlanDetailComponent;
  let fixture: ComponentFixture<WeeklyPlanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyPlanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyPlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
