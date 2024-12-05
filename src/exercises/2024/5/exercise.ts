import {Exercise} from '../../exercise';
import {input} from "./input.ts";

export class Exercise52024 extends Exercise {
    aocDay: number = 5;
    aocYear: number = 2024;
    aocName: string = 'Print Queue';

    rules: [number, number][] = input.split('\n\n')[0]
        .split('\n')
        .map((line: string) => line.split('|').map((n: string) => +n) as [number, number])

    updates: number[][] = input.split('\n\n')[1]
        .split('\n')
        .map((line: string) => line.split(',').map((n: string) => +n))


    getPart1Result(): number {
        const mustCameBefore: Map<number, number[]> = new Map();
        this.rules.forEach(([before, after]: [number, number]) => {
            mustCameBefore.set(before, [...mustCameBefore.get(before) ?? [], after]);
        });

        console.log(Array.from(mustCameBefore.entries())
            .sort((a: [number, number[]], b: [number, number[]]) => b[1].length - a[1].length))
        ;

        return this.updates.filter(
            (update: number[]) => {
                let updateRightOrder: boolean = true;
                for (let i = 0, j = 1; j < update.length; i++, j++) {
                    const before: number = update[i];
                    const after: number = update[j];
                    if (!((mustCameBefore.get(before) ?? []).includes(after))) {
                        updateRightOrder = false;
                        break;
                    }
                }
                return updateRightOrder;
            }
        ).reduce((prev: number, curr: number[]) => {
            return prev + curr[Math.round((curr.length / 2) - 1)];
        }, 0)
    }

    getPart2Result(): number {
        const mustCameBefore: Map<number, number[]> = new Map();
        this.rules.forEach(([before, after]: [number, number]) => {
            mustCameBefore.set(before, [...mustCameBefore.get(before) ?? [], after]);
        });

        const reordered: number[][] = this.updates.filter(
            (update: number[]) => {
                let updateRightOrder: boolean = false;
                for (let i = 0, j = 1; j < update.length; i++, j++) {
                    const before: number = update[i];
                    const after: number = update[j];
                    if (!((mustCameBefore.get(before) ?? []).includes(after))) {
                        updateRightOrder = true;
                        break;
                    }
                }
                return updateRightOrder;
            }
        )
            .map((update: number[]) => {
                const idealOrder: number[] = Array.from(mustCameBefore.entries())
                    .map(([before, afters]: [number, number[]]) => {
                        return [before, afters.filter((after: number) => {
                            return update.includes(after);
                        })] as [number, number[]]
                    })
                    .sort((a: [number, number[]], b: [number, number[]]) => b[1].length - a[1].length)
                    .map((a: [number, number[]]) => a[0]);


                return update.sort((a: number, b: number) => {
                    const indexOfA: number = idealOrder.indexOf(a);
                    const indexOfB: number = idealOrder.indexOf(b);
                    return (indexOfA > -1 ? indexOfA : Number.MAX_VALUE) - (indexOfB > -1 ? indexOfB : Number.MAX_VALUE);
                })
            });

        return reordered.reduce((prev: number, curr: number[]) => {
            return prev + curr[Math.round((curr.length / 2) - 1)];
        }, 0)
    }
}
