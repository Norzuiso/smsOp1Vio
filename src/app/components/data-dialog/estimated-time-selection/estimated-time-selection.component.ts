import { Component, OnInit } from '@angular/core';
import {MatSliderModule} from "@angular/material/slider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-estimated-time-selection',
  templateUrl: './estimated-time-selection.component.html',
  styleUrls: ['./estimated-time-selection.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
  ],
})
export class EstimatedTimeSelectionComponent implements OnInit {
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
