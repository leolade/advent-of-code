import { input } from './input.ts';
import {Exercise} from "../../exercise.ts";
import {toNumberArray} from "../../../core/input-helpers/to-number-array.ts";

export class Exercise12020 extends Exercise {
  aocDay: number = 1;
  aocYear: number = 2020;
  aocName: string = 'Report Repair';

  numbers: number[] = toNumberArray(input);

  getPart1Result(): string {
    if (this.numbers.length < 2) {
      return 'Input too short';
    }

    for (let i = 0; i < this.numbers.length - 1; i++) {
      const n1 = this.numbers[i];
      for (let j = 1; j < this.numbers.length; j++) {
        if (n1 + this.numbers[j] === 2020) {
          return n1 * this.numbers[j] + '';
        }
      }
    }
    return 'No result';
  }

  getPart2Result(): string {
    if (this.numbers.length < 3) {
      return 'Input too short';
    }

    for (let i = 0; i < this.numbers.length - 2; i++) {
      const n1 = this.numbers[i];
      for (let j = 1; j < this.numbers.length - 1; j++) {
        const n2 = this.numbers[j];
        for (let k = 2; k < this.numbers.length; k++) {
          if (n1 + n2 + this.numbers[k] === 2020) {
            return n1 * n2 * this.numbers[k] + '';
          }
        }
      }
    }
    return 'No result';
  }
}
