import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCreationComponent } from './ticket-creation.component';

describe('TicketCreationComponent', () => {
  let component: TicketCreationComponent;
  let fixture: ComponentFixture<TicketCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
