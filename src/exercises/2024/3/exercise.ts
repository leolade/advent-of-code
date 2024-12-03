import {Exercise} from '../../exercise';
import {input} from './input.ts'

export class Exercise32024 extends Exercise {
    aocDay: number = 3;
    aocYear: number = 2024;
    aocName: string = 'Mull It Over';
    input = input;


    getPart1Result(): number {
        const operations: string[] = input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g) ?? [];
        return operations.reduce<number>((a: number, b) => {
            const numbers: number[] = ((b.match(new RegExp(/[0-9]+/g)) ?? [])
                .map((part: string) => +part))
            return a + numbers
                .reduce((prev, curr) => prev * curr, 1);
        }, 0);
    }

    getPart2Result(): string {
        return 'Not implemented yet';
    }
}
