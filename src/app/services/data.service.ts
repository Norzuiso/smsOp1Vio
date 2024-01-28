import { Injectable } from '@angular/core';
import {Instruction} from "../classes/instruction";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private uniqueId: Set<string> = new Set()
  private instructionsQueue: Instruction[] = []
  private totalTime: number = 0

  getTotalTime(): number{
    return this.totalTime
  }
  dummyInstructions(){
    this.instructionsQueue = [
      {ID: "1", Name: "Juan", Ope: "1+1", EstimatedTime: 2, OpeResult: 1, Lote: 0},
      {ID: "2", Name: "Juan", Ope: "1-1", EstimatedTime: 2, OpeResult: 0, Lote: 0},
      {ID: "3", Name: "Juan", Ope: "1*1", EstimatedTime: 2, OpeResult: 1, Lote: 0},
      {ID: "4", Name: "Juan", Ope: "1/1", EstimatedTime: 2, OpeResult: 1, Lote: 0},
      {ID: "5", Name: "Juan", Ope: "1%1", EstimatedTime: 2, OpeResult: 0, Lote: 0},
      {ID: "6", Name: "Juan", Ope: "1*1", EstimatedTime: 2, OpeResult: 1, Lote: 0},
      {ID: "7", Name: "Juan", Ope: "1/1", EstimatedTime: 2, OpeResult: 1, Lote: 0},
      {ID: "8", Name: "Juan", Ope: "1%1", EstimatedTime: 2, OpeResult: 0, Lote: 0},
      {ID: "9", Name: "Juan", Ope: "1%1", EstimatedTime: 2, OpeResult: 0, Lote: 0}
    ];
  }
  dequeueGroup(size: number): Instruction[] {
    const group: Instruction[] = this.instructionsQueue.splice(0, size);
    return group;
  }
  enqueue(item: Instruction): void {
    this.totalTime += item.EstimatedTime
    this.instructionsQueue.push(item)
  }
  dequeue(): Instruction | undefined{
    let shift = this.instructionsQueue.shift();
    this.totalTime -= shift!= undefined ? shift.EstimatedTime : 0;
    return shift;
  }

  getQueue(): Instruction[]{
    return this.instructionsQueue.slice();
  }

  addId(id: string): boolean{
    if (this.uniqueId.has(id)){
      return false;
    }else{
      this.uniqueId.add(id)
      return true;
    }
  }

  getAllId(): string[]{
    return Array.from(this.uniqueId);
  }

  constructor() { }
}
