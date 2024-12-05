import {Exercise} from '../../exercise';
import {input} from './input'

export class Exercise52024 extends Exercise {
    aocDay: number = 5;
    aocYear: number = 2024;
    aocName: string = 'N/C';
    rules: [number, number][] = input.split('\n\n')[0]
        .split('\n')
        .map((line: string) => line.split('|').map((n: string) => +n) as [number, number]);

    ordering: number[][] = input.split('\n\n')[1]
        .split('\n')
        .map((line: string) => line.split(',').map((n: string) => +n));

    getPart1Result(): number {
        const mustComeBefore: Map<number, number[]> = new Map();

        this.rules.forEach(([before, after]: [number, number]) => {
            if (!(mustComeBefore.get(before) ?? []).includes(after)) {
                mustComeBefore.set(before, [...mustComeBefore.get(before) ?? [], after]);
            }
        });

        return this.ordering.filter(
            (order: number[]) => {
                let isOk: boolean = true;
                for (let i = 0, j = 1; j < order.length; i++, j++) {
                    const before: number = order[i];
                    const after: number = order[j];
                    if (!(mustComeBefore.get(before) ?? []).includes(after)) {
                        isOk = false;
                        break;
                    }
                }
                return isOk;
            }
        ).reduce((prev, curr) => {
            return prev + curr[Math.round((curr.length / 2) - 1)];
        }, 0)
    }

    getPart2Result(): number {
        const mustComeBefore: Map<number, number[]> = new Map();

        this.rules.forEach(([before, after]: [number, number]) => {
            if (!(mustComeBefore.get(before) ?? []).includes(after)) {
                mustComeBefore.set(before, [...mustComeBefore.get(before) ?? [], after]);
            }
        });

        return this.ordering.filter(
            (order: number[]) => {
                let isOk: boolean = true;
                for (let i = 0, j = 1; j < order.length; i++, j++) {
                    const before: number = order[i];
                    const after: number = order[j];
                    if (!(mustComeBefore.get(before) ?? []).includes(after)) {
                        isOk = false;
                        break;
                    }
                }
                return isOk;
            }
        ).reduce((prev, curr) => {
            return prev + curr[Math.round((curr.length / 2) - 1)];
        }, 0)

    }
}
