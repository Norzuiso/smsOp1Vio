import {Component} from '@angular/core';
import {DataService} from "./services/data.service";
import {BatchInProgressService} from "./services/batchInProgress/batch-in-progress.service";
import {ProcessJobsService} from "./services/process-jobs.service";
import {InsStatusService} from "./services/InsStatus/ins-status.service";
import {TimerService} from "./services/timer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'act02';
  startedProcessInstructions: boolean = true;
  canWeStartProcess: boolean = false;

  constructor(public dataService: DataService,
              public batchInProgressService: BatchInProgressService,
              public processJobsService: ProcessJobsService,
              protected insStatusService: InsStatusService,
              public timerService: TimerService) {
    this.timerService.stopTimer()
  }


  async startProcessingBatchJob() {
    this.startedProcessInstructions = !this.startedProcessInstructions
    this.timerService.startTimer()
    await this.processJobsService.startProcess()
    this.timerService.stopTimer()
  }

  checkQueue(canWeStart: boolean) {
    this.batchInProgressService.createBatchJobs(this.dataService.getQueue())
    this.canWeStartProcess = canWeStart
  }
}
