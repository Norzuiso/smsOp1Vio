import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  protected startTime: number = 0;
  private timerSubscription: Subscription | null = null;
  private paused: boolean = false;

  private stopTimerSubject = new BehaviorSubject<boolean>(false);
  stopTimer$ = this.stopTimerSubject.asObservable();

  startTimer() {
    this.startTime = Date.now();
    this.paused = false;
    this.stopTimerSubject.next(false);
    this.startInterval();
  }

  stopTimer() {
    this.stopTimerSubject.next(true);
    this.paused = true;

    // Si hay una suscripción existente, la cancelamos
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  private startInterval() {
    if (!this.paused) {
      this.timerSubscription = interval(1000).subscribe(() => {
        if (this.stopTimerSubject.value) {
          this.timerSubscription?.unsubscribe();
          this.timerSubscription = null;
        }
      });
    }
  }
  getElapsedTime(): number {
    const currentTime = Date.now();
    return currentTime - this.startTime;
  }
}
