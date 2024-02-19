import { TestBed } from '@angular/core/testing';

import { BatchInProgressService } from './batch-in-progress.service';

describe('BatchInProgressService', () => {
  let service: BatchInProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchInProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
