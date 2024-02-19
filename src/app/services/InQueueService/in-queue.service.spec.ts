import { TestBed } from '@angular/core/testing';

import { JobsInQueueService } from './jobs-in-queue.service';

describe('InQueueService', () => {
  let service: JobsInQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsInQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
