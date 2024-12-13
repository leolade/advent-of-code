import {Exercise} from '../../exercise';
import {input} from "./input.ts";

export class Exercise112024 extends Exercise {
    aocDay: number = 11;
    aocYear: number = 2024;
    aocName: string = 'N/C';


    getPart1Result(): number {
        let stones: number[] = input.split(' ').map((stone: string) => +stone);
        const acc: Map<number, number> = new Map();
        stones.map((stone: number) => this.blink(stone, 25, acc));
        return Array.from(acc.values()).reduce((prev, current) => prev + current, 0);
    }

    blink(number: number, time: number, acc: Map<number, number> = new Map()): void {
        if (time === 0) {
            acc.set(number, (acc.get(number) ?? 0) + 1);
            return;
        }
        if (number === 0) {
            this.blink(1, time - 1, acc);
            return;
        }
        if ((number + '').length % 2 === 0) {
            const newStones: [number, number] = [+(number + '').substring(0, ((number + '').length / 2)), +(number + '').substring(((number + '').length / 2))];
            this.blink(newStones[0], time - 1, acc);
            this.blink(newStones[1], time - 1, acc);
            return;
        }
        const newStone: number = number * 2024;
        this.blink(newStone, time - 1, acc);
    }

    getPart2Result(): number {
        let stones: number[] = input.split(' ').map((stone: string) => +stone);
        stones.map((stone: number) => this.blink(stone, 75));
        return Array.from(stones.values()).reduce((prev, current) => prev + current, 0);
    }
}
