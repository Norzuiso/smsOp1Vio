import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private startTime: number;

  private stopTimerSubject = new BehaviorSubject<boolean>(false);
  stopTimer$ = this.stopTimerSubject.asObservable();

  startTimer() {
    this.startTime = Date.now(); // Reinicia el tiempo sin crear una nueva instancia de Date
    this.stopTimerSubject.next(false);
  }

  stopTimer() {
    this.stopTimerSubject.next(true);
  }
  constructor() {
    this.startTime = new Date().getTime();
  }
  getElapsedTime(): number{
    const currentTime = new Date().getTime()
    return currentTime - this.startTime
  }
}
