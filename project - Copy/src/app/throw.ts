import { Dice } from "./dice";

export class Throw extends Dice {
    dices: Dice[] = [];
    numberThrow: number = 0;
    numberDices: number = 0;

    totalNumberOfEyes: number = 0;
    reasonThrow: string = "";

    total1WasThrowed: number = 0;
    total2WasThrowed: number = 0;
    total3WasThrowed: number = 0;
    total4WasThrowed: number = 0;
    total5WasThrowed: number = 0;
    total6WasThrowed: number = 0;
}
