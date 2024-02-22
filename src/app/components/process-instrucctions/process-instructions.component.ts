import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Job} from "../../classes/job";
import {BatchInProgressService} from "../../services/batchInProgress/batch-in-progress.service";
import {ProcessJobsService} from "../../services/process-jobs.service";

@Component({
  selector: 'app-process-instrucctions',
  templateUrl: './process-instructions.component.html',
  styleUrls: ['./process-instructions.component.css']
})
export class ProcessInstructionsComponent implements OnInit {
  instructionsGroups: Job[][] = []
  totalTime: number = 1
  isTimeDone: boolean = false

  constructor(public dataService: DataService,
              public batchInProgressService: BatchInProgressService,
              ) {
    this.batchInProgressService.createBatchJobs(dataService.getQueue());

    this.LotesPendientes = this.instructionsGroups.length
    this.totalTime = this.dataService.getTotalTime()
  }


  async ngOnInit(): Promise<void> {
    await this.startProcess();
  }

  batchInProgress: Job[] = []
  batchInProgressID: number = 0

  processInProgress: Job = new Job()
  timerInProgress: number = 0
  timerRest: number = 0

  intervalo: number = 1000; // Intervalo de actualización en milisegundos


  terminateProcess: Job[] = []
  LotesPendientes = 0

  async startProcess() {
    let index = 0;
    for (const value of this.instructionsGroups) {
      index++;
      this.batchInProgressID = index
      this.batchInProgress = value
      for (const ins of value) {
        ins.Lote = index
        await this.iniciarContador(ins)
        this.terminateProcess.unshift(ins)
      }
      this.LotesPendientes--
    }
    this.processInProgress = new Job()
    this.batchInProgress = []
    this.batchInProgressID = 0
  }


  private iniciarContador(ins: Job): Promise<void> {
    return new Promise<void>((resolve) => {
      let contador = 0;
      const contadorInterval = setInterval(() => {
        contador++;
        this.timerInProgress = contador;
        this.timerRest = ins.EstimatedTime - this.timerInProgress
        this.processInProgress = ins
        if (contador >= ins.EstimatedTime) {
          clearInterval(contadorInterval);
          resolve();
        }
      }, this.intervalo);

    });
  }

  temporizadorAgotado(evento: boolean) {
    this.isTimeDone = evento
  }
}
