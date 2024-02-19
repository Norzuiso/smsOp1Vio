import {Component, OnInit} from '@angular/core';
import {Job} from "../../classes/job";
import {DataService} from "../../services/data.service";
import {BatchInProgressService} from "../../services/batchInProgress/batch-in-progress.service";
import {JobsInQueueService} from "../../services/InQueueService/jobs-in-queue.service";

@Component({
  selector: 'app-job-batch-in-progress-list',
  templateUrl: './job-batch-in-progress-list.component.html',
  styleUrls: ['./job-batch-in-progress-list.component.css']
})
export class JobBatchInProgressListComponent implements OnInit {
  constructor(public jobInQueue: JobsInQueueService) {

  }

  ngOnInit(): void {
  }

}
