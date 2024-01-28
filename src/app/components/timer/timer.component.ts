import { Component, OnInit } from '@angular/core';
import {TimerService} from "../../services/timer.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  public elapsedTime: number = 0;

  constructor(private timeService: TimerService) { }

  ngOnInit(): void {
    setInterval(()=>{
      this.elapsedTime = this.timeService.getElapsedTime()
    }, 1000)
  }

}
