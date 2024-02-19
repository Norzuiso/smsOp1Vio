import { TestBed } from '@angular/core/testing';

import { InsStatusService } from './ins-status.service';

describe('InsStatusService', () => {
  let service: InsStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
