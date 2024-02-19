import { Component, OnInit } from '@angular/core';
import {ProcessJobsService} from "../../services/process-jobs.service";
import {InsStatusService} from "../../services/InsStatus/ins-status.service";

@Component({
  selector: 'app-job-in-progress',
  templateUrl: './job-in-progress.component.html',
  styleUrls: ['./job-in-progress.component.css']
})
export class JobInProgressComponent implements OnInit {

  constructor(protected jobInProgressService: ProcessJobsService,
              protected insStatusService: InsStatusService) { }

  ngOnInit(): void {
  }

}
