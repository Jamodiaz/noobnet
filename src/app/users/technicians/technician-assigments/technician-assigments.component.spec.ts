import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianAssigmentsComponent } from './technician-assigments.component';

describe('TechnicianAssigmentsComponent', () => {
  let component: TechnicianAssigmentsComponent;
  let fixture: ComponentFixture<TechnicianAssigmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianAssigmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianAssigmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
