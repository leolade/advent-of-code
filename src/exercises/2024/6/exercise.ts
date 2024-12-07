import {Exercise} from '../../exercise';
import {toString2DArray} from "../../../core/input-helpers/to-string-2D-array.ts";
import {input} from "./input.ts";
import {Coordinate} from "../../../core/Coordinate.ts";
import {CardinalPoint} from "../../../core/CardinalPoint.ts";

export class Exercise62024 extends Exercise {
    aocDay: number = 6;
    aocYear: number = 2024;
    aocName: string = 'Guard Gallivant';

    map: string[][] = [];

    getPart1Result(): number {
        this.map = toString2DArray(input);
        const y = this.map.findIndex((line: string[]) => {
            return line.includes('^');
        });
        const x = this.map[y].indexOf('^');
        const startPoint = new Coordinate(x, y);
        let nextPoint: Coordinate | undefined = new Coordinate(x, y);
        let direction: CardinalPoint = 'N';

        while (nextPoint !== undefined) {
            const result: [Coordinate | undefined, CardinalPoint] = this.move(nextPoint ?? startPoint, direction);
            nextPoint = result[0];
            direction = result[1];
        }

        return this.map.map(
            (line: string[]) => {
                return line.filter((char: string) => char === 'X').length
            }
        ).reduce((prev, curr) => prev + curr, 0)
    }

    move(startPoint: Coordinate, direction: CardinalPoint): [Coordinate | undefined, CardinalPoint] {
        const nextCoordinate: Coordinate = startPoint.translateByCardinalPoint([direction]);
        this.map[startPoint.y][startPoint.x] = 'X';
        const nextTile: string | undefined = nextCoordinate.getIn(this.map);

        if (nextTile === undefined) {
            return [undefined, direction];
        } else if (nextTile === '#') {
            return [startPoint, this.turn(direction)];
        }
        return [nextCoordinate, direction];
    }

    turn(direction: CardinalPoint): CardinalPoint {
        switch (direction) {
            case "N":
                return 'E';
            case "E":
                return 'S';
            case "S":
                return 'W';
            case "W":
                return 'N'
        }
    }

    getPart2Result(): string {
        return 'Not implemented yet';
    }
}
