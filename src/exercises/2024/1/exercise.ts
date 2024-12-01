import {Exercise} from '../../exercise';
import {input} from './input.ts';

export class Exercise12024 extends Exercise {
    aocDay: number = 1;
    aocYear: number = 2024;
    aocName: string = 'Historian Hysteria';

    input: [number, number][] = input.split('\n')
        .map((line: string) => {
            const parts: string[] = line.split('   ');
            if (parts.length !== 2) {
                throw new Error('Bad input or parsing');
            }
            return parts.map((part: string) => parseInt(part.trim())) as [number, number]

        });

    getPart1Result(): number {
        // Split input in two array : left and right
        const leftList: number[] = [];
        const rightList: number[] = [];
        this.input.forEach(([left, right]: [number, number]) => {
            leftList.push(left);
            rightList.push(right);
        });

        // Sort arrays
        leftList.sort((a, b) => a - b);
        rightList.sort((a, b) => a - b);

        const distances: number[] = leftList.map((leftValue: number, index: number) => {
            const rightValue: number = rightList[index];
            return Math.abs(leftValue - rightValue);
        });

        return distances.reduce((previousValue: number, currentValue: number) => {
            return previousValue + currentValue
        }, 0);
    }

    getPart2Result(): string {
        return 'Not implemented yet';
    }
}
