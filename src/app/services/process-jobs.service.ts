import {HostListener, Injectable} from '@angular/core';
import {ProcessInstructionsComponent} from "../components/process-instrucctions/process-instructions.component";
import {BatchInProgressService} from "./batchInProgress/batch-in-progress.service";
import {Job} from "../classes/job";
import {fromEvent} from "rxjs";
import {JobsInQueueService} from "./InQueueService/jobs-in-queue.service";
import {FinishJobsService} from "./finishProcess/finish-jobs.service";
import {InsStatusService} from "./InsStatus/ins-status.service";
import {TimerService} from "./timer.service";

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
              protected insStatusService: InsStatusService,
              private timerService: TimerService) {
  }

  jobInProgress: Job = new Job()
  jobs: Job[] = [];

  async startProcess() {
    this.jobsInQueue.setQueue(this.batchInProgressService.getBatchInProgress())

    this.jobs = this.jobsInQueue.getQueue();

    for (let job of this.jobs) {
      this.jobInProgress = job
      this.jobsInQueue.dequeue()
      window.addEventListener('keydown', this.handleKeyDown.bind(this));

      await this.iniciarContador()
      if (this.insStatusService.getStatus() != "E") {
        this.finishJobs.enqueue(job)
      }else{
        this.jobsInQueue.enqueue(this.jobInProgress)
        this.jobs.push(this.jobInProgress)
        this.insStatusService.setStatus("C")
      }
    }
    if (this.batchInProgressService.getJobsBatch().length != 0) {
      await this.startProcess()
    } else {
      this.insStatusService.setStatus("F")
      this.insStatusService.terminatedProcess = true
      this.timerService.stopTimer()
      return
    }
  }

  private iniciarContador(): Promise<void> {
    return new Promise<void>((resolve) => {
      let contador = this.jobInProgress.TimeInProgress;
      const contadorInterval = setInterval(() => {
        if (this.insStatusService.getStatus() == "E") {
          clearInterval(contadorInterval)
          resolve()
        }else if (this.insStatusService.getStatus() == "W") {
          this.jobInProgress.OpeResult = "Error"
          this.insStatusService.setStatus("C")
          clearInterval(contadorInterval)
          resolve()
        } else if (this.insStatusService.getStatus() != "P") { // Verificar si no está en pausa
          contador++;
          this.jobInProgress.TimeInProgress = contador
          this.jobInProgress.timerRest = this.jobInProgress.EstimatedTime - this.jobInProgress.TimeInProgress

          if (contador >= this.jobInProgress.EstimatedTime) {
            clearInterval(contadorInterval);
            resolve()
          }
        }
      }, 1000);

      // Agregar listener para el evento de tecla presionada
    });
  }

  // Método para manejar el evento de tecla presionada
  private handleKeyDown(event: KeyboardEvent): void {
    let key = event.key.toUpperCase();
    switch (key) {
      case 'P':
        if (this.insStatusService.getStatus() == 'P') {
          break
        }
        this.timerService.stopTimer()
        this.insStatusService.status = key

        break;
      case 'C':
        if (this.insStatusService.getStatus() == 'P') {
          this.timerService.startTimer();
          this.insStatusService.status = key;
        }
        break;
      case 'E':
        if (this.insStatusService.status != "P") {
          this.insStatusService.status = "E"
        }
        break;
      case 'W':
        if (this.insStatusService.status != "P") {
          this.insStatusService.status = key
        }
        break;
      // Puedes agregar más casos según sea necesario para otras teclas
    }
  }
}
