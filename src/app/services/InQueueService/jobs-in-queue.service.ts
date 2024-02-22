import {Injectable} from '@angular/core';
import {Job} from "../../classes/job";

@Injectable({
  providedIn: 'root'
})
export class JobsInQueueService {

  private jobsInQueue: Job[] = []
  private totalTime: number = 0
  private batchID: string = ""


  getBatchID():string{
    return this.batchID
  }
  setTotalTime(time: number){
    this.totalTime = time
  }

  getTotalTime(): number{
    this.totalTime = 0
    for(let i of this.jobsInQueue){
      if (i.timerRest == 0){
        this.totalTime += i.EstimatedTime
      }else{
        this.totalTime += i.timerRest
      }
    }
    return this.totalTime
  }

  enqueue(job: Job): void {
    this.jobsInQueue.push(job)
  }

  dequeue(): Job | undefined {
    let shift = this.jobsInQueue.shift();
    this.totalTime -= shift != undefined ? shift.EstimatedTime : 0;
    return shift;
  }

  getQueue(): Job[] {
    return this.jobsInQueue.slice();
  }

  setQueue(jobs: Job[]): void{
    for (let job of jobs){
      this.totalTime += job.EstimatedTime - job.ElapsedTime
      this.batchID = String(job.Lote)
    }
    this.jobsInQueue = []
    this.jobsInQueue = jobs
  }
  constructor() {
  }
}
