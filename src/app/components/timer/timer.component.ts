import {Component, Input, OnInit} from '@angular/core';
import {TimerService} from "../../services/timer.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @Input() stopTime: boolean = false;
  public elapsedTime: number = 0;
  private intervalId: any; // Variable para almacenar el ID del intervalo

  constructor(private timeService: TimerService) { }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.elapsedTime = this.timeService.getElapsedTime();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId); // Detener el temporizador usando el ID del intervalo
  }
}
