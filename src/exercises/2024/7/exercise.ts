import {Exercise} from '../../exercise';
import {input} from "./input.ts";

type OperationType = '+' | '*' | '||';

class OperationWrapper {

    result: number;
    members: number[];

    constructor(string: string, public operators: OperationType[] = ['+', '*']) {
        this.result = +string.split(':')[0];
        this.members = string.split(':')[1].trim().split(' ').map((n: string) => +n);
    }

    getAllOperatorsCombination(): OperationType[][] {
        const results: OperationType[][] = [];
        const limit = this.operators.length ** (this.members.length - 1)
        for (let i = 0; i < limit; i++) {
            results.push(i.toString(this.operators.length).padStart(this.members.length - 1, '0').split('').map((char: string) => this.operators[+char]));
        }
        return results;
    }

    match(): boolean {
        return this.getAllOperatorsCombination().some(
            (operators: OperationType[]) => {
                const operations: (number | OperationType)[] = [...this.members];
                operators.forEach((operator: OperationType, index: number) => {
                    operations.splice((index * 2) + 1, 0, operator);
                });
                this.calc(operations);
                return operations.length === 1 && operations[0] === this.result;
            }
        )
    }

    private calc(operations: (number | OperationType)[]) {
        while ((operations.indexOf('*') > -1 || operations.indexOf('+') > -1 || operations.indexOf('||') > -1) && +operations[0] < this.result) {
            const indexOfMultiplication = operations.indexOf('*');
            const indexOfAddition = operations.indexOf('+');
            const indexOfConcatenation = operations.indexOf('||');
            const minValue: number = Math.min(...[indexOfMultiplication, indexOfAddition, indexOfConcatenation].filter((value: number) => value >= 0));
            if (minValue === indexOfMultiplication) {
                operations.splice(indexOfMultiplication - 1, 3, (+operations[indexOfMultiplication - 1]) * (+operations[indexOfMultiplication + 1]));
            } else if (minValue === indexOfAddition) {
                operations.splice(indexOfAddition - 1, 3, (+operations[indexOfAddition - 1]) + (+operations[indexOfAddition + 1]));
            } else {
                operations.splice(indexOfConcatenation - 1, 3, +((operations[indexOfConcatenation - 1] + '') + (operations[indexOfConcatenation + 1] + '')));
            }
        }
    }
}

export class Exercise72024 extends Exercise {
    aocDay: number = 7;
    aocYear: number = 2024;
    aocName: string = 'Bridge Repair';

    operations: OperationWrapper[] = [];

    getPart1Result(): number {
        this.operations = input.split('\n').map((line: string) => new OperationWrapper(line));
        return this.operations.filter((op: OperationWrapper) => op.match())
            .reduce((prev, curr) => {
            return prev + curr.result
        }, 0)
    }

    getPart2Result(): number {
        this.operations = input.split('\n').map((line: string) => new OperationWrapper(line, ['+', '*', '||']));
        const match = this.operations.filter((op: OperationWrapper) => op.match())
        return match
            .reduce((prev, curr) => {
                return prev + curr.result
            }, 0)
    }
}
