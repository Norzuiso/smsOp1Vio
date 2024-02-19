import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Job} from "../../classes/job";
import {MatDialog} from "@angular/material/dialog";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output()
  canWeStartProcessBooleanEventEmitter= new EventEmitter<boolean>();
  jobsQuantity = 1

  instruction: Job = new Job()
  formGroup: FormGroup = new FormGroup({
    jobsQuantityFormControl: new FormControl(this.jobsQuantity, [
      Validators.required
    ]),

  })
  constructor(public dialog: MatDialog,
              private dataService: DataService) {
  }

  ngOnInit(): void {
  }


  checkQueue() {
    return this.dataService.getQueue()?.length !=0
  }

  generateJobs() {
    this.jobsQuantity = this.formGroup.getRawValue()["jobsQuantityFormControl"]
    if (this.jobsQuantity <= 0){
      alert("Cantidad de trabajos invalida. Tiene que ser mayor a 0")
    }else{
      this.dataService.createJobs(this.jobsQuantity)
      this.canWeStartProcessBooleanEventEmitter.emit(this.checkQueue())
    }
  }
}
