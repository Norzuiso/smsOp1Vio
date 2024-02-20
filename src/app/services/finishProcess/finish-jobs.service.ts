import { Injectable } from '@angular/core';
import {Job} from "../../classes/job";

@Injectable({
  providedIn: 'root'
})
export class FinishJobsService {

  private finishJobs: Job[] = []

  enqueue(job: Job):void{
    this.finishJobs.unshift(job)
  }

  dequeueJob(): Job{
    let shift = this.finishJobs.shift();
    if (shift != undefined){
      return shift;
    }
    return {timerRest: 0, TimeInProgress: 0, ElapsedTime: 0, EstimatedTime: 0, ID: "", Lote: 0, Ope: "", OpeResult: "0"}
  }

  getFinishJobs(): Job[]{
    return this.finishJobs
  }

  constructor() { }
}
