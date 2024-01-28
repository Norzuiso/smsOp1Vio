import { Component } from '@angular/core';
import {DataService} from "./services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'act02';
  startedProgram: boolean = false;
  startedProcessInstructions: boolean = true;
  canWeStartProcess: boolean = false;

  constructor(public dataService: DataService) {
  }


  checkQueue(canWeStart: boolean) {
    this.canWeStartProcess = canWeStart
  }
}
