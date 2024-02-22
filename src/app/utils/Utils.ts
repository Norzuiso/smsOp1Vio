export class Utils {

  constructor() {
  }

  private operands: string [] = ['+', '-', '*', '/', '%']

  generateJobFullOperation(): any {
    let ope = this.generateOperation()
    let result: string = eval(ope)

    return {"ope": ope, "result": result};
  }

  private generateOperation() {
    let randomIntA = this.generateRandomInt(1, 99);
    let randomOperandID = this.generateRandomInt(0, this.operands.length)
    let randomOperandStr: string = this.operands[randomOperandID]
    let randomIntB = this.generateRandomInt(1, 99);

    return String(randomIntA) + " " + randomOperandStr + " " + String(randomIntB)
  }

  generateRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  generateEstimatedTime() {
    return this.generateRandomInt(5, 19);
  }
}
