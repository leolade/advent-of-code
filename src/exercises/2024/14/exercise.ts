import {Exercise} from '../../exercise';
import {input} from "./input.ts";
import {Coordinate} from "../../../core/Coordinate.ts";

class Robot {
    currentPosition: Coordinate;

    constructor(public intialPosition: Coordinate, public velocity: Coordinate) {
        this.currentPosition = this.intialPosition.clone();
    }

    move(duration: number) {
        this.currentPosition = this.currentPosition.translate(this.velocity.x * duration, this.velocity.y * duration);
        return this.currentPosition;
    }

}

function move(v: number, max: number): number {
    if (v < 0) {
        if ((Math.abs(v) % (max + 1)) === 0) {
            return 0;
        }
        return max - move(Math.abs(v), max) + 1
    }
    return (Math.abs(v) % (max + 1));
}

class Space {

    constructor(public maxX: number, public maxY: number, public minX: number = 0, public minY: number = 0) {
    }

    teleport(robot: Robot) {
        robot.currentPosition.x = move(robot.currentPosition.x, this.maxX);
        robot.currentPosition.y = move(robot.currentPosition.y, this.maxY);
    }

    split(): [Space, Space, Space, Space] {
        const topLeftSpace = new Space(
            Math.trunc((this.maxX / 2) - (this.maxX % 2 === 0 ? 1 : 2)),
            Math.trunc((this.maxY / 2) - (this.maxY % 2 === 0 ? 1 : 2)),
            this.minX,
            this.minY
        );
        const topRightSpace = new Space(
            this.maxX,
            topLeftSpace.maxY,
            topLeftSpace.maxX +
            (this.maxX % 2 === 0 ? 2 : 1),
            topLeftSpace.minY);
        const bottomLeftSpace = new Space(
            topLeftSpace.maxX,
            this.maxY,
            this.minX,
            topLeftSpace.maxY + (this.maxY % 2 === 0 ? 2 : 1)
        );
        const bottomRightSpace = new Space(
            this.maxX,
            this.maxY,
            topRightSpace.minX,
            bottomLeftSpace.minY
        );
        return [
            topLeftSpace,
            topRightSpace,
            bottomLeftSpace,
            bottomRightSpace
        ];
    }

    includes(robot: Robot): boolean {
        return robot.currentPosition.x <= this.maxX && robot.currentPosition.x >= this.minX &&
            robot.currentPosition.y <= this.maxY && robot.currentPosition.y >= this.minY;
    }

    render(robots: Robot[]): string {
        let result: string = '';
        for (let y = 0; y <= this.maxY; y++) {
            let line: string = '';
            for (let x = 0; x <= this.maxX; x++) {
                line += robots.filter((robot: Robot) => robot.currentPosition.x === x && robot.currentPosition.y === y).length;
            }
            result = result + '\n' + line.replaceAll('0', '.');
        }
        return result;
    }
}


export class Exercise142024 extends Exercise {
    aocDay: number = 14;
    aocYear: number = 2024;
    aocName: string = 'Restroom Redoubt';


    getPart1Result(): string {
        console.log('-0', move(-0, 3));
        console.log('-1', move(-1, 3));
        console.log('-2', move(-2, 3));
        console.log('-3', move(-3, 3));
        console.log('-4', move(-4, 3));
        console.log('-5', move(-5, 3));
        console.log('-6', move(-6, 3));
        console.log('-7', move(-7, 3));
        console.log('-8', move(-8, 3));
        console.log('-9', move(-9, 3));
        console.log('-10', move(-10, 3));
        console.log('-11', move(-11, 3));
        console.log('-12', move(-12, 3));
        console.log('-13', move(-13, 3));
        console.log('-14', move(-14, 3));
        console.log('-15', move(-15, 3));
        console.log('-16', move(-16, 3));
        const robots: Robot[] = input.split('\n')
            .map(
                (robotDescriptor: string) => {
                    const [robotXPosition, robotYPosition, velocityX, velocityY]: [number, number, number, number] = (robotDescriptor
                        .match(/[-]?[0-9]+/g) ?? []
                        .map((r: string) => +r)) as [number, number, number, number]

                    return new Robot(
                        new Coordinate(+robotXPosition, +robotYPosition),
                        new Coordinate(+velocityX, +velocityY),
                    )
                }
            );

        const space: Space = new Space(10, 6);
        const spaces: Space[] = space.split();
        const robotBySpace: Map<Space, Robot[]> = new Map();

        robots.forEach((robot: Robot) => {
            robot.move(5);
            space.teleport(robot);
            const spacePerRobot: Space | undefined = spaces.find((spaceIterator: Space) => {
                return spaceIterator.includes(robot);
            });
            if (spacePerRobot) {
                robotBySpace.set(spacePerRobot, [...(robotBySpace.get(spacePerRobot) ?? []), robot])
            }
        })

        console.log(robots);
        console.log(robotBySpace);
        console.log(space.render(robots));

        return robots[0].currentPosition.x + '/' + robots[0].currentPosition.y
    }

    getPart2Result(): number {
        return 0;
    }
}
