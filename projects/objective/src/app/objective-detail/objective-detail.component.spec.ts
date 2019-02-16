import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveDetailComponent } from './objective-detail.component';

describe('ObjectiveDetailComponent', () => {
  let component: ObjectiveDetailComponent;
  let fixture: ComponentFixture<ObjectiveDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
