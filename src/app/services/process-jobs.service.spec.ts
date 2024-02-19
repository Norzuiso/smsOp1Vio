import { TestBed } from '@angular/core/testing';

import { ProcessJobsService } from './process-jobs.service';

describe('ProcessJobsService', () => {
  let service: ProcessJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
