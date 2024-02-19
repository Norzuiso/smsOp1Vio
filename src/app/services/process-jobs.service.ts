import {HostListener, Injectable} from '@angular/core';
import {ProcessInstructionsComponent} from "../components/process-instrucctions/process-instructions.component";
import {BatchInProgressService} from "./batchInProgress/batch-in-progress.service";
import {Job} from "../classes/job";
import {fromEvent} from "rxjs";
import {JobsInQueueService} from "./InQueueService/jobs-in-queue.service";
import {FinishJobsService} from "./finishProcess/finish-jobs.service";
import {InsStatusService, KeyCode} from "./InsStatus/ins-status.service";

export enum KEY_CODE {
  LETTER_P = 80,
  LETTER_C = 67,
  LETTER_E = 69,
  LETTER_W = 87
}
@Injectable({
  providedIn: 'root'
})
export class ProcessJobsService {

  constructor(private batchInProgressService: BatchInProgressService,
              private jobsInQueue: JobsInQueueService,
              private finishJobs: FinishJobsService,
              protected insStatusService: InsStatusService) {
  }

  jobInProgress: Job = new Job()

  timerRest: number = 0

  async startProcess() {
    this.jobsInQueue.setQueue(this.batchInProgressService.getBatchInProgress())
    let jobs: Job[] = this.jobsInQueue.getQueue();

    for (let job of jobs){
      this.jobInProgress = job
      await this.iniciarContador()
      this.finishJobs.enqueue(job)
      this.jobsInQueue.dequeue()
    }
    if (this.jobsInQueue.getQueue().length != 0){
      await this.startProcess()
    }else{
      this.insStatusService.setStatus("F")
      return
    }
  }
  private iniciarContador(): Promise<void> {
    return new Promise<void>((resolve) => {
      let contador = 0;
      const contadorInterval = setInterval(() => {
        contador++;
        this.jobInProgress.TimeInProgress = contador;
        this.timerRest = this.jobInProgress.EstimatedTime - this.jobInProgress.TimeInProgress
        if (contador >= this.jobInProgress.EstimatedTime) {
          clearInterval(contadorInterval);
          resolve();
        }
      }, 1000);

    });
  }
}
