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

    getPart2Result(): number {
        const operations: string[] = input.match(/(mul\([0-9]{1,3},[0-9]{1,3}\))|(do\(\))|(don't\(\))/g) ?? [];

        let operationEnable: boolean = true;
        let acc: number = 0;
        operations.forEach(
            (operation: string) => {
                if (operation === 'do()') {
                    operationEnable = true;
                    return;
                }

                if (operation === 'don\'t()') {
                    operationEnable = false;
                    return;
                }

                if (!operationEnable) {
                    return;
                }

                acc = acc + (((operation.match(new RegExp(/[0-9]+/g)) ?? [])
                    .map((part: string) => +part))
                    .reduce((prev, curr) => prev * curr, 1)
                )
            }
        )

        return acc;
    }
}
