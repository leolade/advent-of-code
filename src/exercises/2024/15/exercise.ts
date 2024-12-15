import {Exercise} from '../../exercise';
import {Coordinate} from "../../../core/Coordinate.ts";
import {input} from "./input.ts";
import {CardinalPoint} from "../../../core/CardinalPoint.ts";

class Warehouse {
    public tiles: (WarehouseElement | undefined)[][] = [];

    toString(): string {
        return this.tiles.map((line: (WarehouseElement | undefined)[]) => {
            return line.map((element: WarehouseElement | undefined) => {
                return element ? element.toString() : '.'
            }).join('');
        }).join('\n');
    }
}

abstract class WarehouseElement extends Coordinate {
    abstract canMove: boolean;

    constructor(
        public x: number,
        public y: number,
        public warehouse: Warehouse,
    ) {
        super(x, y)
    }
    abstract toString(): string;

    move(direction: "N" | "S" | "E" | "W", acc: [WarehouseElement, Coordinate][] = []): boolean {
        if (!this.canMove) {
            return false;
        }
        const nextCoord: Coordinate = this.translateByCardinalPoint([direction]);
        const nextElement: WarehouseElement | undefined = nextCoord.getIn(this.warehouse.tiles);
        if (nextElement === undefined) {
            acc.push([this, nextCoord]);
            if (acc[1]) {
                acc[1][0].x = acc[acc.length - 1][1].x;
                acc[1][0].y = acc[acc.length - 1][1].y;
                this.warehouse.tiles[acc[1][0].y][acc[1][0].x] = acc[1][0];
            }
            this.warehouse.tiles[acc[0][0].y][acc[0][0].x] = undefined;
            acc[0][0].x = acc[0][1].x;
            acc[0][0].y = acc[0][1].y;
            this.warehouse.tiles[acc[0][0].y][acc[0][0].x] = acc[0][0];
            return true;
        } else if (!nextElement.canMove) {
            return false;
        } else {
            acc.push([this, nextCoord]);
            return nextElement.move(direction, acc);
        }
    }

    getGPSCoord(): number {
        return 0;
    }
}


class Wall extends WarehouseElement {
    canMove = false;
    toString() {
        return '#'
    }
}

class Employee extends WarehouseElement {
    canMove = true;
    toString() {
        return '@'
    }
}

class Box extends WarehouseElement {
    canMove = true;
    toString() {
        return 'O'
    }

    getGPSCoord(): number {
        return (100 * this.y) + this.x;
    }
}

export class Exercise152024 extends Exercise {
    aocDay: number = 15;
    aocYear: number = 2024;
    aocName: string = 'N/C';


    getPart1Result(): number {
        let employee: Employee | undefined;
        const warehouse: Warehouse = new Warehouse();
        warehouse.tiles =
            input.split('\n\n')[0]
                .split('\n')
                .map((line: string, y: number) => {
                    return line.split('')
                        .map((char: string, x: number) => {
                                switch (char) {
                                    case '#':
                                        return new Wall(x, y, warehouse);
                                    case 'O':
                                        return new Box(x, y, warehouse);
                                    case '@':
                                        employee = new Employee(x, y, warehouse);
                                        return employee
                                    default:
                                        return undefined;
                                }
                            }
                        )
                });

        const instructions: (CardinalPoint | undefined)[] =
            input.split('\n\n')[1].split('\n').join('').split('')
                .map((char: string) => {
                    switch (char) {
                        case '>':
                            return "E";
                        case '<':
                            return "W";
                        case '^':
                            return "N";
                        case 'v':
                            return "S";
                        default:
                            return undefined;
                    }
                });

        instructions.forEach((instruction: CardinalPoint | undefined) => {
            if (!instruction || !employee) {
                return;
            }
            employee.move(instruction);
        })
        return warehouse.tiles.flat().reduce(
            (acc: number, tile: WarehouseElement | undefined) => {
                if (tile) {
                    return acc + tile.getGPSCoord();
                }
                return acc;
            }, 0
        )
    }

    getPart2Result(): string {
        return 'Not implemented yet';
    }
}
