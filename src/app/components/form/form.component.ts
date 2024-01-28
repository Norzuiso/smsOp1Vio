import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Instruction} from "../../classes/instruction";
import {MatDialog} from "@angular/material/dialog";
import {DataDialogComponent} from "../data-dialog/data-dialog.component";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output()
  canWeStartProcessBooleanEventEmitter= new EventEmitter<boolean>();

  instruction: Instruction = new Instruction()
  formGroup: FormGroup = new FormGroup({
    id: new FormControl(this.instruction.Name),
    name: new FormControl(this.instruction.Name, [
      Validators.required
    ]),

  })
  constructor(public dialog: MatDialog,
              private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  openInstructionDialog() {
    let dialogRef = this.dialog.open(DataDialogComponent, {
      height: '80%',
      width: '80%',
    });
    dialogRef.afterOpened().subscribe(() => {
      const registerButton = document.getElementById('registerBtnDataDialog') as HTMLButtonElement;
      if (registerButton) {
        console.log("")
        registerButton.focus();
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.canWeStartProcessBooleanEventEmitter.emit(this.checkQueue())
    })
  }

  checkQueue() {
    return this.dataService.getQueue()?.length !=0
  }
}
