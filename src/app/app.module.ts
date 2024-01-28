import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TimerComponent} from './components/timer/timer.component';
import {FormComponent} from './components/form/form.component';
import {DataDialogComponent} from './components/data-dialog/data-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {DataService} from "./services/data.service";
import {MatButtonModule} from "@angular/material/button";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import { EstimatedTimeSelectionComponent } from './components/data-dialog/estimated-time-selection/estimated-time-selection.component';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    FormComponent,
    DataDialogComponent
  ],
  imports: [
    BrowserModule,
    EstimatedTimeSelectionComponent,
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
  providers: [DataDialogComponent,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
