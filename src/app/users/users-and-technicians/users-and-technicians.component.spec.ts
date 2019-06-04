import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAndTechniciansComponent } from './users-and-technicians.component';

describe('UsersAndTechniciansComponent', () => {
  let component: UsersAndTechniciansComponent;
  let fixture: ComponentFixture<UsersAndTechniciansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAndTechniciansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAndTechniciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
