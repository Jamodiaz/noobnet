import { TestBed } from '@angular/core/testing';

import { MyHomeService } from './my-home.service';

describe('MyHomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyHomeService = TestBed.get(MyHomeService);
    expect(service).toBeTruthy();
  });
});
