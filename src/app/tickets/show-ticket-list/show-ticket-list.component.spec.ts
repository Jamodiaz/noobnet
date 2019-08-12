import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTicketListComponent } from './show-ticket-list.component';

describe('ShowTicketListComponent', () => {
  let component: ShowTicketListComponent;
  let fixture: ComponentFixture<ShowTicketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTicketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
