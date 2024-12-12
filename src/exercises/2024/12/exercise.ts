import {Exercise} from '../../exercise';
import {Coordinate} from "../../../core/Coordinate.ts";
import {input} from "./input.ts";


class Plant extends Coordinate {
    constructor(x: number, y: number, public type: string) {
        super(x, y);
    }
}

export class Exercise122024 extends Exercise {
    aocDay: number = 12;
    aocYear: number = 2024;
    aocName: string = 'N/C';

    getPart1Result(): number {
        const fenceByType: Map<string, Plant[]> = new Map();

        const plants: Plant[][] = input.split('\n')
            .map((line: string, y: number) => {
                return line
                    .split('')
                    .map((char: string, x: number) => {
                        return new Plant(x, y, char);
                    })
            });

        plants.forEach((plantLine: Plant[]) => {
            plantLine.forEach(
                (plant: Plant) => {
                    fenceByType.set(plant.type, [...(fenceByType.get(plant.type) ?? []), plant]);
                }
            )
        })

        // TODO Séparer par zone

        return Array.from(fenceByType.values()).reduce((prev, curr) => prev + (curr[0] * curr[1]), 0);
    }

    getPart2Result(): string {
        return 'Not implemented yet';
    }
}
