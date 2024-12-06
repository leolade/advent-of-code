import {Exercise} from '../../exercise';
import {toString2DArray} from "../../../core/input-helpers/to-string-2D-array.ts";
import {input} from "./input.ts";
import {Coordinate} from "../../../core/Coordinate.ts";
import {CardinalPoint} from "../../../core/CardinalPoint.ts";

export class Exercise62024 extends Exercise {
    aocDay: number = 6;
    aocYear: number = 2024;
    aocName: string = 'N/C';

    map: string[][] = [];

    getPart1Result(): number {
        this.map = toString2DArray(input);
        const y = this.map.findIndex((line: string[]) => {
            return line.includes('^');
        });
        const x = this.map[y].indexOf('^');
        const startPoint = new Coordinate(x, y);
        let nextPoint = new Coordinate(x, y);
        let direction: CardinalPoint = 'N';
        let acc = 0;

        try {
            while(true) {
                acc++
                const result: [Coordinate, CardinalPoint] = this.move(nextPoint, direction);
                console.log(result);
                nextPoint = result[0];
                direction = result[1];
            }
        } catch (e) {
            console.log('stop')
        }

        return acc;
    }

    move(startPoint: Coordinate, direction: CardinalPoint): [Coordinate, CardinalPoint] {
        console.log('startPoint', startPoint, direction);
        const nextCoordinate: Coordinate = startPoint.translateByCardinalPoint([direction]);
        this.map[startPoint.y][startPoint.x] = 'X';
        const nextTile: string | undefined = nextCoordinate.getIn(this.map);

        console.log('nextCoordinate', nextCoordinate.x, nextCoordinate.y);
        console.log('nextTile', nextTile);

        if (nextTile === undefined) {
            throw new Error("Out of bounds");
        } else if (nextTile === '#') {
            return [nextCoordinate, this.turn(direction)];
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
