import {Exercise} from '../../exercise';
import {input} from "./input.ts";

class FS {

    constructor(public sequence: number[][]) {
    }

    getFirstFreeSpaceIndex(): number {
        return this.sequence.lastIndexOf([]);
    }

    getLastFileChunkIndex(): number {
        return this.sequence
            .reverse()
            .findIndex((fileChunk: number[]) => {
                return fileChunk.length > 0;
            });
    }

    getFirstFileChunkIndex(): number {
        return this.sequence
            .reverse()
            .findIndex((fileChunk: number[]) => {
                return fileChunk.length > 0;
            });
    }
}

export class Exercise92024 extends Exercise {
    aocDay: number = 9;
    aocYear: number = 2024;
    aocName: string = 'N/C';

    fs: FS;

    getPart1Result(): number {
        const sequences: number[][][] = []
        this.fs = new FS(input.split('').map((value, index) => {
                if (index % 2 === 0) {
                    return new Array(+value).fill([index]);
                } else {
                    return new Array(+value).fill([]);
                }
            }).flat()
        );


        return this.fs.length;
    }

    getPart2Result(): string {
        return 'Not implemented yet';
    }
}
