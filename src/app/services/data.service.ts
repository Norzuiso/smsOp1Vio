import {Injectable} from '@angular/core';
import {Job} from "../classes/job";
import {Utils} from "../utils/Utils";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private jobBatchInProgress: Job[] = []

  private instructionsQueue: Job[] = []

  private totalTime: number = 0

  private utils: Utils = new Utils()

  getTotalTime(): number {
    return this.totalTime
  }

  createJobs(quantity: number): Job[] {
    let job: Job = {TimeInProgress: 0, ElapsedTime: 0, EstimatedTime: 0, ID: "", Lote: 0, Ope: "", OpeResult: "0"}
    let fullOperation: any = {};
    for (let i = 0; i != quantity; i++) {
      job.ID = String(i)

      job.EstimatedTime = this.utils.generateEstimatedTime()
      this.totalTime += job.EstimatedTime

      fullOperation = this.utils.generateJobFullOperation()
      job.Ope = fullOperation?.ope
      job.OpeResult = fullOperation?.result

      this.enqueue(job)
      job = {TimeInProgress: 0, ElapsedTime: 0, EstimatedTime: 0, ID: "", Lote: 0, Ope: "", OpeResult: "0"}
    }

    return this.getQueue()
  }


  enqueue(item: Job): void {
    this.totalTime += item.EstimatedTime
    this.instructionsQueue.push(item)
  }

  dequeue(): Job | undefined {
    let shift = this.instructionsQueue.shift();
    this.totalTime -= shift != undefined ? shift.EstimatedTime : 0;
    return shift;
  }

  getQueue(): Job[] {
    return this.instructionsQueue.slice();
  }

  constructor() {
  }

}
