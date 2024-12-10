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
            const successfullPathCounter = this.findSuccessfullPathFrom(point, hikingPoints, [point], 0);
            return prev + successfullPathCounter;
        }, 0)
    }

    getPart2Result(): string {
        return 'Not implemented yet';
    }

    private findSuccessfullPathFrom(point: HikingPoint, map: HikingPoint[][], currentPath: HikingPoint[], acc: number): number {
        (['N', 'E', 'W', 'S'] as CardinalPoint[]).forEach((cardinalPoint: CardinalPoint) => {
            const nextPoint: HikingPoint | undefined = point.translateByCardinalPoint([cardinalPoint]).getIn(map);
            if (nextPoint === undefined) {
                return;
            }
            if (nextPoint.value === 9) {
                acc += 1;
                currentPath.push(nextPoint);
                this.markPathAsSuccessfull(currentPath);
            } else if (nextPoint.successfullPathFromThisPoint > 0) {
                acc += nextPoint.successfullPathFromThisPoint;
                this.markPathAsSuccessfull(currentPath);
            } else if ((nextPoint.value - 1) === point.value) {
                acc += this.findSuccessfullPathFrom(nextPoint, map, [...currentPath, nextPoint], acc);
            }
        })
        return acc;
    }

    private markPathAsSuccessfull(currentPath: HikingPoint[]) {
        currentPath.forEach(
            (point: HikingPoint) => {
                point.successfullPathFromThisPoint += 1;
            }
        )
    }
}
