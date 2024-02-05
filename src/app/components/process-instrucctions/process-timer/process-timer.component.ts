import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-process-timer',
  templateUrl: './process-timer.component.html',
  styleUrls: ['./process-timer.component.css']
})
export class ProcessTimerComponent implements OnInit {
  @Input() tiempoInicial: number = 0; // Valor en segundos que se pasa desde el componente padre
  @Output() tiempoAgotado: EventEmitter<boolean> = new EventEmitter<boolean>();

  tiempoRestante: number = 0;

  ngOnInit(): void {
    this.iniciarTemporizador();
  }

  iniciarTemporizador() {
    this.tiempoRestante = this.tiempoInicial;

    const intervalo = setInterval(() => {
      this.tiempoRestante--;

      if (this.tiempoRestante <= 0) {
        clearInterval(intervalo);
        this.tiempoAgotado.emit(true);
      }
    }, 1000);
  }
}
