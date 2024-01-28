import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Instruction} from "../../classes/instruction";
import {delay, interval, Subscription} from "rxjs";

@Component({
  selector: 'app-process-instrucctions',
  templateUrl: './process-instructions.component.html',
  styleUrls: ['./process-instructions.component.css']
})
export class ProcessInstructionsComponent implements OnInit {
  instructionsGroups: Instruction[][] = []

  constructor(public dataService: DataService) {
   // dataService.dummyInstructions();
    this.groupInstructions();
    this.LotesPendientes = this.instructionsGroups.length
  }

  private groupInstructions() {
    const totalValues = this.dataService.getQueue().length;
    const groupSize = 4;

    for (let i = 0; i < totalValues; i += groupSize) {
      const group = this.dataService.dequeueGroup(groupSize);
      if (group.length > 0) {
        this.instructionsGroups.push(group);
      }
    }
  }

  async ngOnInit(): Promise<void> {
    await this.startProcess();
    // Aquí puedes continuar con el código después de que el contador haya terminado
    console.log('Contador terminado, continuando con el código...');
  }

  batchInProgress: Instruction[] = []
  batchInProgressID: number = 0

  processBatchInProgress: number = 0;
  processInProgress: Instruction = new Instruction()
  timerInProgress: number = 0
  timerRest: number = 0

  valorActualizado: number = 0;
  duracionSegundos: number = 10; // Cambia esto según la duración deseada
  intervalo: number = 1000; // Intervalo de actualización en milisegundos


  terminateProcess: Instruction[] = []
  LotesPendientes = 0

  async startProcess() {
    let index = 0;
    for (const value of this.instructionsGroups) {
      index++;
      this.batchInProgressID = index
      this.batchInProgress = value
      for(const ins of value){
        ins.Lote = index
        await this.iniciarContador(ins)
        this.terminateProcess.unshift(ins)
      }
      this.LotesPendientes--
    }
    this.processInProgress = new Instruction()
    this.batchInProgress = []
    this.batchInProgressID = 0
  }


  private iniciarContador(ins: Instruction): Promise<void> {
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

}
