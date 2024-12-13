import {Exercise} from '../../exercise';
import {Coordinate} from "../../../core/Coordinate.ts";
import {input} from "./input.ts";

class Button {
    constructor(
        public x: number,
        public y: number
    ) {
    }
}

class Machine {
    minToken: number | undefined;

    constructor(
        public buttonA: Button,
        public buttonB: Button,
        public prizeLocaiton: Coordinate
    ) {
    }
}

export class Exercise132024 extends Exercise {
    aocDay: number = 13;
    aocYear: number = 2024;
    aocName: string = 'Claw Contraption';


    getPart1Result(): number {
        const machines: Machine[] = input.split('\n\n')
            .map(
                (machineDescriptor: string) => {
                    const lines: [number, number][] = machineDescriptor.split('\n')
                        .map((line: string) => {
                            return (line.match(/[0-9]+/g) ?? []).map((r: string) => +r) as [number, number] ;
                        });
                    return new Machine(
                        new Button(lines[0][0], lines[0][1]),
                        new Button(lines[1][0], lines[1][1]),
                        new Coordinate(lines[2][0], lines[2][1]),
                    )
                }
            );

        return machines.filter(
            (machine: Machine) => {
                const [aButtonPressedTime, bButtonPressedTime]: [number, number] = this.solveCramer([machine.buttonA.x, machine.buttonB.x, machine.prizeLocaiton.x], [machine.buttonA.y, machine.buttonB.y, machine.prizeLocaiton.y]);
                machine.minToken = (aButtonPressedTime * 3) + bButtonPressedTime;
                return aButtonPressedTime % 1 === 0 && bButtonPressedTime % 1 === 0 && aButtonPressedTime < 100 && bButtonPressedTime < 100;
            }
        ).reduce((prev, curr) => {
           return prev + (curr.minToken ?? 0);
        },0)
    }

    getPart2Result(): number {
        const machines: Machine[] = input.split('\n\n')
            .map(
                (machineDescriptor: string) => {
                    const lines: [number, number][] = machineDescriptor.split('\n')
                        .map((line: string) => {
                            return (line.match(/[0-9]+/g) ?? []).map((r: string) => +r) as [number, number] ;
                        });
                    return new Machine(
                        new Button(lines[0][0], lines[0][1]),
                        new Button(lines[1][0], lines[1][1]),
                        new Coordinate(10000000000000 + lines[2][0], 10000000000000 + lines[2][1]),
                    )
                }
            );

        return machines.filter(
            (machine: Machine) => {
                const [aButtonPressedTime, bButtonPressedTime]: [number, number] = this.solveCramer([machine.buttonA.x, machine.buttonB.x, machine.prizeLocaiton.x], [machine.buttonA.y, machine.buttonB.y, machine.prizeLocaiton.y]);
                machine.minToken = (aButtonPressedTime * 3) + bButtonPressedTime;
                return aButtonPressedTime % 1 === 0 && bButtonPressedTime % 1 === 0;
            }
        ).reduce((prev, curr) => {
            return prev + (curr.minToken ?? 0);
        },0)
    }

    solveCramer([a, b, e]: [number, number, number], [c, d, f]: [number, number, number]): [number, number] {
        const determinant: number = (a * d) - (c * b);
        return [
            ((e * d) - (f * b)) / determinant,
            ((f * a) - (e * c)) / determinant,
        ]
    }
}
