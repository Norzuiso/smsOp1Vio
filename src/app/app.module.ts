import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TimerComponent} from './components/timer/timer.component';
import {FormComponent} from './components/form/form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {DataService} from "./services/data.service";
import {MatButtonModule} from "@angular/material/button";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";
import { ProcessInstructionsComponent } from './components/process-instrucctions/process-instructions.component';
import { ProcessTimerComponent } from './components/process-instrucctions/process-timer/process-timer.component';
import { JobBatchInProgressListComponent } from './components/job-batch-in-progress-list/job-batch-in-progress-list.component';
import { FinishJobsComponent } from './components/finish-jobs/finish-jobs.component';
import { JobInProgressComponent } from './components/job-in-progress/job-in-progress.component';
import { JobsComponent } from './jobs/jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    FormComponent,
    ProcessInstructionsComponent,
    ProcessTimerComponent,
    JobBatchInProgressListComponent,
    FinishJobsComponent,
    JobInProgressComponent,
    JobsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    NgbModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSliderModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [

    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
