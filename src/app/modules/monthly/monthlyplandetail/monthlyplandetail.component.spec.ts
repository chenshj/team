import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPlanDetailComponent } from './monthlyplandetail.component';

describe('MonthlyPlanDetailComponent', () => {
  let component: MonthlyPlanDetailComponent;
  let fixture: ComponentFixture<MonthlyPlanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyPlanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyPlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
