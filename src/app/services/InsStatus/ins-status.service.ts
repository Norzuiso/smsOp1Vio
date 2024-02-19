import {Injectable} from '@angular/core';
import {TimerService} from "../timer.service";

const breakIns: string = "E"
const errorIns: string = "W"
const pauseIns: string = "P"
const continueIns: string = "C"

export const enum KeyCode {
  LETTER_P = 80,
  LETTER_C = 67,
  LETTER_E = 69,
  LETTER_W = 87
}

@Injectable({
  providedIn: 'root'
})
export class InsStatusService {


  constructor(public timerService: TimerService) {
  }

  private status: string = "N"


  setStatus(statusStr: string) {
    this.status = statusStr
  }

  isProgramFinish():boolean{
    return  this.status == "F"
  }

  isProgramPaused(): boolean {
    return this.status == "P"
  }


  getStatus(): string {
    return this.status
  }

}
