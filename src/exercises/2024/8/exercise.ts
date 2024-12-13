import {Exercise} from '../../exercise';
import {input} from "./input.ts";
import {Coordinate} from "../../../core/Coordinate.ts";

export class Exercise82024 extends Exercise {
    aocDay: number = 8;
    aocYear: number = 2024;
    aocName: string = 'Resonant Collinearity';

    map: string[] = [];

    getPart1Result(): number {
        this.map = input.split('\n');
        const antennas: Map<string, Coordinate[]> = new Map();

        this.map.forEach(
            (line: string, y: number) => {
                let match;
                let re = /[a-zA-Z0-9]/g;
                while ((match = re.exec(line)) != null) {
                    antennas.set(match[0], [...(antennas.get(match[0]) ?? []), new Coordinate(match.index, y)])
                }
            }
        );

        let antinodes: Coordinate[] = [];

        Array.from(antennas.entries())
            .forEach(([antennaName, antennaCoordinates]: [string, Coordinate[]]) => {
                for (let i = 0; i < antennaCoordinates.length; i++) {
                    for (let j = 0; j < antennaCoordinates.length; j++) {
                        if (i === j) {
                            continue;
                        }
                        const diff: Coordinate = antennaCoordinates[i].getDiff(antennaCoordinates[j]);
                        antinodes.push(antennaCoordinates[i].translate(diff.x, diff.y));
                    }
                }
            })

        return antinodes.filter((value, index, self) =>
                value.getInStringArray(this.map) && index === self.findIndex((t) => (
                    t.x === value.x && t.y === value.y
                ))
        ).length;
    }

    getPart2Result(): number {
        return NaN;
    }
}
