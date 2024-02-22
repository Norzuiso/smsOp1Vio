import {Injectable} from '@angular/core';
import {TimerService} from "../timer.service";

const breakIns: string = "E"
const errorIns: string = "W"
const pauseIns: string = "P"
const continueIns: string = "C"

@Injectable({
  providedIn: 'root'
})
export class InsStatusService {


  constructor(public timerService: TimerService) {
  }

  terminatedProcess: boolean = false;

  status: string = "N"


  setStatus(statusStr: string) {
    this.status = statusStr
  }

  isProgramFinish(): boolean {
    return this.status == "F" || this.terminatedProcess
  }


  getStatus(): string {
    return this.status
  }

}
