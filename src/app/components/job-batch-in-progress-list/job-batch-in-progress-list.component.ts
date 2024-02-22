import {Component, OnInit} from '@angular/core';
import {Job} from "../../classes/job";
import {DataService} from "../../services/data.service";
import {BatchInProgressService} from "../../services/batchInProgress/batch-in-progress.service";
import {JobsInQueueService} from "../../services/InQueueService/jobs-in-queue.service";
import {JobInProgressComponent} from "../job-in-progress/job-in-progress.component";
import {ProcessJobsService} from "../../services/process-jobs.service";
import {InsStatusService} from "../../services/InsStatus/ins-status.service";

@Component({
  selector: 'app-job-batch-in-progress-list',
  templateUrl: './job-batch-in-progress-list.component.html',
  styleUrls: ['./job-batch-in-progress-list.component.css']
})
export class JobBatchInProgressListComponent implements OnInit {

  constructor(public jobInQueue: JobsInQueueService,
              public ins: InsStatusService,
              public jobInProgress: ProcessJobsService) {

  }

  ngOnInit(): void {
  }
}
