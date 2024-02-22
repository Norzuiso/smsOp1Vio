import { Component, OnInit } from '@angular/core';
import {FinishJobsService} from "../../services/finishProcess/finish-jobs.service";
import {InsStatusService} from "../../services/InsStatus/ins-status.service";
import {Job} from "../../classes/job";

@Component({
  selector: 'app-finish-jobs',
  templateUrl: './finish-jobs.component.html',
  styleUrls: ['./finish-jobs.component.css']
})
export class FinishJobsComponent implements OnInit {


  totalExecutedTime = 0
  constructor(protected finishJobs: FinishJobsService,
              protected ins: InsStatusService) { }

  ngOnInit(): void {
  }



  calculateTotalTime() {
    if(this.ins.terminatedProcess){
      for( let job of this.finishJobs.getFinishJobs()){
        this.totalExecutedTime += job.TimeInProgress
      }
    }
    return this.totalExecutedTime

  }

}
