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

  async startProcess() {
    this.jobsInQueue.setQueue(this.batchInProgressService.getBatchInProgress())
    let jobs: Job[] = this.jobsInQueue.getQueue();

    for (let job of jobs) {
      this.jobInProgress = job
      this.jobsInQueue.dequeue()
      await this.iniciarContador()
      this.finishJobs.enqueue(job)
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
      let contador = 0;
      const contadorInterval = setInterval(() => {
        if (this.insStatusService.getStatus() == "E") {
          this.jobsInQueue.enqueue(this.jobInProgress);
          this.jobInProgress = {
            ElapsedTime: 0,
            EstimatedTime: 0,
            ID: "",
            Lote: 0,
            Ope: "",
            OpeResult: "",
            TimeInProgress: 0,
            timerRest: 0
          }

          clearInterval(contadorInterval);
          resolve()
        }
        if (this.insStatusService.getStatus() == "W") {
          this.jobInProgress.OpeResult = "Error"
          clearInterval(contadorInterval);
          resolve()
          this.insStatusService.setStatus("C")
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
      window.addEventListener('keydown', this.handleKeyDown.bind(this, contadorInterval));
    });
  }

  // Método para manejar el evento de tecla presionada
  private handleKeyDown(contadorInterval: NodeJS.Timeout, event: KeyboardEvent): void {
    let key = event.key.toUpperCase();
    switch (key) {
      case 'P':
        if (this.insStatusService.getStatus() == 'P') {
          break
        }
        this.timerService.stopTimer()
        console.log("Esta aquí")
        this.insStatusService.status = key

        break;
      case 'C':
        this.timerService.startTimer()
        this.insStatusService.status = key
        break;
      case 'W':
        if (this.insStatusService.status != "P") {
          this.insStatusService.status = key
        }
        break;
      // Puedes agregar más casos según sea necesario para otras teclas
    }
  }


  private asd(contadorInterval: NodeJS.Timeout, event: KeyboardEvent): void {
    if (!this.insStatusService.isProgramFinish()) {

      let key = event.key.toUpperCase();
      if (key == "P") {
        this.timerService.stopTimer()
      }
      if (key == "C" && this.insStatusService.status == "P") {
        this.timerService.startTimer()

      }
      this.insStatusService.status = key
    }

  }


}
