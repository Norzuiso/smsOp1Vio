import { Injectable } from '@angular/core';
import {Instruction} from "../classes/instruction";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private uniqueId: Set<string> = new Set()
  private instructionsQueue: Instruction[] = []

  dummyInstructions(): Instruction[]{

    return [
      {ID: "4", Name: "Juan", Ope: "1+1", EstimatedTime: 1, OpeResult: 0},
      {ID: "1", Name: "Juan", Ope: "1-1", EstimatedTime: 2, OpeResult: 0},
      {ID: "5", Name: "Juan", Ope: "1*1", EstimatedTime: 3, OpeResult: 0},
      {ID: "3", Name: "Juan", Ope: "1/1", EstimatedTime: 4, OpeResult: 0},
      {ID: "2", Name: "Juan", Ope: "1%1", EstimatedTime: 5, OpeResult: 0}
    ]
  }
  enqueue(item: Instruction): void {
    this.instructionsQueue.push(item)
  }
  dequeue(): Instruction | undefined{
    return this.instructionsQueue.shift();
  }

  getQueue(): Instruction[] | undefined{
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
