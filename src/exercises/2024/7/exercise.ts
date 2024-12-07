import {Exercise} from '../../exercise';
import {input} from "./input.ts";

class OperationWrapper {

    result: number;
    members: number[];

    constructor(string: string) {
        this.result = +string.split(':')[0];
        this.members = string.split(':')[1].trim().split(' ').map((n: string) => +n);
    }

    getAllOperatorsCombination(): ('+' | '*')[][] {
        const results: ('+' | '*')[][] = [];
        const limit = 2 ** (this.members.length - 1)
        for (let i = 0; i < limit; i++) {
            results.push(i.toString(2).padStart(this.members.length - 1, '0').split('').map((char: string) => char === '0' ? '+' : '*'));
        }
        return results;
    }

    match(): boolean {
        return this.getAllOperatorsCombination().some(
            (operators: ('+' | '*')[]) => {
                const operations: (number | string)[] = [...this.members];
                operators.forEach((operator: '+' | '*', index: number) => {
                    operations.splice((index * 2) + 1, 0, operator);
                });
                this.calc(operations);
                return operations[0] === this.result;
            }
        )
    }

    private calc(operations: (number | string)[]) {
        while (operations.indexOf('*') > -1 || operations.indexOf('+') > -1) {
            const indexOfMultiplication = operations.indexOf('*');
            const indexOfAddition = operations.indexOf('+');
            if ((indexOfMultiplication > -1 && indexOfMultiplication < indexOfAddition) || indexOfAddition < 0) {
                operations.splice(indexOfMultiplication - 1, 3, (+operations[indexOfMultiplication - 1]) * (+operations[indexOfMultiplication + 1]));
            } else {
                operations.splice(indexOfAddition - 1, 3, (+operations[indexOfAddition - 1]) + (+operations[indexOfAddition + 1]));
            }
        }
    }
}

export class Exercise72024 extends Exercise {
    aocDay: number = 7;
    aocYear: number = 2024;
    aocName: string = 'Bridge Repair';

    operations: OperationWrapper[] = input.split('\n').map((line: string) => new OperationWrapper(line));

    getPart1Result(): number {
        return this.operations.filter((op: OperationWrapper) => op.match())
            .reduce((prev, curr) => {
            return prev + curr.result
        }, 0)
    }

    getPart2Result(): string {
        return 'Not implemented yet';
    }
}
