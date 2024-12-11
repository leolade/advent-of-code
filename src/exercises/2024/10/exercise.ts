import {Exercise} from '../../exercise';
import {Coordinate} from "../../../core/Coordinate.ts";
import {CardinalPoint} from "../../../core/CardinalPoint.ts";
import {input} from "./input.ts";

class HikingPoint extends Coordinate {

    successfullPathFromThisPoint: number = 0;

    constructor(x: number, y: number, public value: number) {
        super(x, y);
    }
}


export class Exercise102024 extends Exercise {
    aocDay: number = 10;
    aocYear: number = 2024;
    aocName: string = 'N/C';


    getPart1Result(): number {
        const hikingPoints: HikingPoint[][] = input.split('\n')
            .map((line: string, y: number) => line
                .split('')
                .map((char: string, x: number) => new HikingPoint(x, y, +char))
            );
        return hikingPoints.flat().reduce((prev, point) => {
            if (point.value !== 0) {
                return prev;
            }
            const successfullPathCounter = this.findSuccessfullPathFrom(point, hikingPoints, [point], [], 0);
            return prev + successfullPathCounter;
        }, 0)
    }

    getPart2Result(): number {
        const hikingPoints: HikingPoint[][] = input.split('\n')
            .map((line: string, y: number) => line
                .split('')
                .map((char: string, x: number) => new HikingPoint(x, y, +char))
            );
        return hikingPoints.flat().reduce((prev, point) => {
            if (point.value !== 0) {
                return prev;
            }
            const successfullPathCounter = this.findSuccessfullPathFrom(point, hikingPoints, [point], [], 0, true);
            return prev + successfullPathCounter;
        }, 0)
    }

    private findSuccessfullPathFrom(point: HikingPoint, map: HikingPoint[][], currentPath: HikingPoint[], currentNinePointReached: HikingPoint[], acc: number, part2: boolean = false): number {
        (['N', 'E', 'W', 'S'] as CardinalPoint[]).forEach((cardinalPoint: CardinalPoint) => {
            const nextPoint: HikingPoint | undefined = point.translateByCardinalPoint([cardinalPoint]).getIn(map);
            if (nextPoint === undefined || nextPoint.value === 0) {
                return;
            }
            if (currentPath.some((value: HikingPoint) => value.x === nextPoint.x && value.y === nextPoint.y)) {
                return;
            }
            if (point.value === 8 && nextPoint.value === 9 && !currentNinePointReached.includes(nextPoint)) {
                acc += 1;
                if (!part2) {
                    currentNinePointReached.push(nextPoint);
                }
            }
            if ((nextPoint.value - 1) === point.value) {
                acc += this.findSuccessfullPathFrom(nextPoint, map, [...currentPath, nextPoint], currentNinePointReached, 0, part2);
            }
        })
        return acc;
    }
}
