import {CardinalPoint} from "./CardinalPoint.ts";

export class Coordinate {
    constructor(public x: number, public y: number) {
    }

    translate(x: number, y: number) {
        return new Coordinate(this.x + x, this.y + y)
    }

    translateByCardinalPoint(cardinalPoints: CardinalPoint[]): Coordinate {
        let result: Coordinate = new Coordinate(this.x, this.y);
        cardinalPoints.forEach(
            (cardinalPoint: CardinalPoint) => {
                switch (cardinalPoint) {
                    case 'N':
                        result = result.translate(0, -1);
                        break;
                    case 'S':
                        result = result.translate(0, 1);
                        break;
                    case 'E':
                        result = result.translate(1, 0);
                        break;
                    case 'W':
                        result = result.translate(-1, 0);
                        break;
                }
            }
        )
        return result;
    }

    getIn<T>(array2D: T[][]): T | undefined {
        if (this.y < 0 || this.y >= array2D.length) {
            return undefined;
        }
        const line: T[] = array2D[this.y];

        if (!line || this.x < 0 || this.x >= line.length) {
            return undefined;
        }

        return line[this.x];
    }

    getInStringArray(array: string[]): string | undefined {
        if (this.y < 0 || this.y >= array.length) {
            return undefined;
        }
        const line: string = array[this.y];

        if (!line || this.x < 0 || this.x >= line.length) {
            return undefined;
        }

        return line[this.x];
    }

    getDiff(coordinate: Coordinate): Coordinate {
        return new Coordinate(this.x - coordinate.x, this.y - coordinate.y);
    }
}
