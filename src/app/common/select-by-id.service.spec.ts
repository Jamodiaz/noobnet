import { TestBed } from '@angular/core/testing';

import { SelectByIdService } from './select-by-id.service';

describe('SelectByIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectByIdService = TestBed.get(SelectByIdService);
    expect(service).toBeTruthy();
  });
});
