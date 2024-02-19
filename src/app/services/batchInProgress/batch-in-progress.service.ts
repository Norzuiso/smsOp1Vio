import {Injectable} from '@angular/core';
import {Job} from "../../classes/job";

@Injectable({
  providedIn: 'root'
})
export class BatchInProgressService {


  public jobsBatch: Job[][] = []

  createBatchJobs(jobsList: Job[]) {
    const totalValues = jobsList.length;
    const groupSize = 4;
    let batchId = 0;

    for (let i = 0; i < totalValues; i += groupSize) {
      const group = jobsList.splice(0, groupSize);
      if (group.length > 0) {
        batchId++
        group.map((x: Job) => {
          x.Lote = batchId
        })
        this.jobsBatch.push(group);
      }
    }
  }

  getJobsBatch(){
    return this.jobsBatch
  }
  getBatchInProgress() {
    return this.dequeueBatch()
  }

  dequeueBatch(): Job[] {
    let shift = this.jobsBatch.shift();
    if (shift != undefined){
      return shift;
    }
    return []
  }

  constructor() {
  }
}
