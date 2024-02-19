import { TestBed } from '@angular/core/testing';

import { FinishJobsService } from './finish-jobs.service';

describe('FinishProcessService', () => {
  let service: FinishJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinishJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
