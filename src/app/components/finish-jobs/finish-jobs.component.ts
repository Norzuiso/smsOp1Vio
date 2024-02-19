import { Component, OnInit } from '@angular/core';
import {FinishJobsService} from "../../services/finishProcess/finish-jobs.service";

@Component({
  selector: 'app-finish-jobs',
  templateUrl: './finish-jobs.component.html',
  styleUrls: ['./finish-jobs.component.css']
})
export class FinishJobsComponent implements OnInit {

  constructor(protected finishJobs: FinishJobsService) { }

  ngOnInit(): void {
  }

}
