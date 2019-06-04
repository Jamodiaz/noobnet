import { TestBed } from '@angular/core/testing';

import { TechnicianAssigmentsService } from './technician-assigments.service';

describe('TechnicianAssigmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechnicianAssigmentsService = TestBed.get(TechnicianAssigmentsService);
    expect(service).toBeTruthy();
  });
});
