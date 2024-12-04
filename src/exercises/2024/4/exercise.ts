import {Exercise} from '../../exercise';
import {Coordinate} from "../../../core/Coordinate.ts";
import {CardinalPoint} from "../../../core/CardinalPoint.ts";
import {input} from './input.ts'
import {multipleIndexOfChar} from "../../../core/string-utils.ts";


export class Exercise42024 extends Exercise {
    aocDay: number = 4;
    aocYear: number = 2024;
    aocName: string = 'Ceres Search';
    input: string[][] = input.split('\n').map((line: string) => line.split(''));

    getPart1Result(): number {
        return this.input.reduce<number>(
            (prev: number, line: string[], y: number) => {
                return prev + multipleIndexOfChar(line.join(''), 'X')
                    .reduce<number>((counter: number, x: number) => {
                        console.log('X find a coordinate', x, y);
                        const allDirections: CardinalPoint[][] = [
                            ['N'],
                            ['N', 'E'],
                            ['E'],
                            ['S', 'E'],
                            ['S'],
                            ['S', 'W'],
                            ['W'],
                            ['N', 'W'],
                        ];

                        return counter + allDirections.filter((direction: CardinalPoint[]) => {
                            return this.hasLettersInDirection(['M', 'A', 'S'], direction, new Coordinate(x, y), this.input)
                        }).length

                    }, 0)
            }, 0
        )
    }

    getPart2Result(): number {
        return this.input.reduce<number>(
            (prev: number, line: string[], y: number) => {
                return prev + multipleIndexOfChar(line.join(''), 'A')
                    .reduce<number>((counter: number, x: number) => {
                        console.log('A find a coordinate', x, y);
                        const firstDiagonal: [string | undefined, string | undefined] = [
                            new Coordinate(x, y).translateByCardinalPoint(['N', 'E']).getIn(this.input),
                            new Coordinate(x, y).translateByCardinalPoint(['S', 'W']).getIn(this.input),
                        ].sort() as [string | undefined, string | undefined];
                        const secondDiagonal: [string | undefined, string | undefined] = [
                            new Coordinate(x, y).translateByCardinalPoint(['N', 'W']).getIn(this.input),
                            new Coordinate(x, y).translateByCardinalPoint(['S', 'E']).getIn(this.input),
                        ].sort() as [string | undefined, string | undefined];
                        return counter + ([firstDiagonal, secondDiagonal].every(
                            ([m, s]: [string | undefined, string | undefined]) => {
                                return m === 'M' && s === 'S';
                            }
                        ) ? 1 : 0)
                    }, 0)
            }, 0
        )
    }

    hasLettersInDirection(letters: string[], direction: CardinalPoint[], source: Coordinate, map: string[][]): boolean {
        const letter: string = letters[0];
        if (!letter) {
            return false;
        }
        const nextLetterCoordinate: Coordinate = source.translateByCardinalPoint(direction);
        if (letter === nextLetterCoordinate.getIn(map)) {
            console.log(letter + ' find a coordinate', nextLetterCoordinate.x, nextLetterCoordinate.y);
            if (letters.slice(1).length === 0) {
                return true;
            }
            return this.hasLettersInDirection(letters.slice(1), direction, nextLetterCoordinate, map);
        } else {
            return false;
        }
    }
}
