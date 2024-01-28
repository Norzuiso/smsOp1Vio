import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private startTime: number;
  constructor() {
    this.startTime = new Date().getTime();
  }
  getElapsedTime(): number{
    const currentTime = new Date().getTime()
    return currentTime - this.startTime
  }
}
