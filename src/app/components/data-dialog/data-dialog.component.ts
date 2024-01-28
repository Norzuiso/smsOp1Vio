import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Instruction} from "../../classes/instruction";
import {DataService} from "../../services/data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-data-dialog',
  templateUrl: './data-dialog.component.html',
  styleUrls: ['./data-dialog.component.css'],

})
export class DataDialogComponent implements OnInit {
  value: any = {};
  operand: string = "+"
  numA: number = 0
  numB: number = 0

  operations: string[] = [
    "+",
    "-",
    "*",
    "/",
    "%",
  ];

  public ins: Instruction = new Instruction()
  public formGroup: FormGroup = new FormGroup({
    id: new FormControl(this.ins.ID,
      Validators.required),
    name: new FormControl(this.ins.Name,
      Validators.required),
    numA: new FormControl(this.numA,
      Validators.required),
    numB: new FormControl(this.numB,
      Validators.required),
    time: new FormControl(this.ins.EstimatedTime,
      Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<DataDialogComponent>,
              private dataService: DataService) {
  }

  @HostListener('window:keyup.Enter', ['$event'])
  onDialogClick(event: KeyboardEvent): void {
    this.save();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }


  save() {
    if (this.formGroup.invalid) {
      alert("Datos incompletos")
      this.formGroup.reset()
      return
    }

    let isModOrDiv = this.operand == "%" || this.operand=="/";
    let isNumAOrNumBZero = this.numA==0 || this.numB == 0;
    if (isModOrDiv && isNumAOrNumBZero) {
      alert("Operación invalida, en division o residuo los valores no pueden ser 0")
      this.formGroup.get("numA")?.reset()
      this.formGroup.get("numB")?.reset()
      return
    }

    this.fillInstrucction();
    this.ins.Ope = this.createOperations()
    this.ins.OpeResult = this.calculateOpeResult()

    let isDataIdUniqueAndAdded = this.dataService.addId(this.ins.ID);
    if (!isDataIdUniqueAndAdded) {
      alert("El id igresado no es unico")
      this.formGroup.get("id")?.reset()
      return
    }

    this.dataService.enqueue(this.ins)
    alert("Instrucción registrada correctamente")
    this.formGroup.reset()
  }

  private fillInstrucction() {
    this.ins.ID = this.formGroup.getRawValue()["id"]
    this.ins.Name = this.formGroup.getRawValue()["name"]
    this.ins.EstimatedTime = this.formGroup.getRawValue()["time"]
  }

  private createOperations() {
    return this.numA + this.operand + this.numB
  }

  private calculateOpeResult() {
    switch (this.operand) {
      case "+":
        return this.numA + this.numB
      case "-":
        return this.numA - this.numB
      case "*":
        return this.numA * this.numB
      case "/":
        return this.numA / this.numB
      case"%":
        return this.numA % this.numB
    }
    return 0;
  }
}
