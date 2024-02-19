import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBatchInProgressListComponent } from './job-batch-in-progress-list.component';

describe('JobBatchInProgressListComponent', () => {
  let component: JobBatchInProgressListComponent;
  let fixture: ComponentFixture<JobBatchInProgressListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobBatchInProgressListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobBatchInProgressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
