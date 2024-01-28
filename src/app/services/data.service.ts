import { Injectable } from '@angular/core';
import {Instruction} from "../classes/instruction";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private uniqueId: Set<string> = new Set()
  private instructionsQueue: Instruction[] = []

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
