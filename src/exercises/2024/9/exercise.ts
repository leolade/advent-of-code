import {Exercise} from '../../exercise';
import {input} from "./input.ts";

interface Sizable {
    size: number;
}

class File implements Sizable {
    size: number;

    constructor(public id: number, public chunks: number[]) {
        this.size = chunks.length;
    }
}

class FreeSpace implements Sizable {

    constructor(public size: number) {
    }
}

class FS {

    constructor(public sequence: (number | '.')[]) {
    }

    getFirstFreeSpaceIndex(): number {
        return this.sequence.indexOf('.');
    }

    getLastChunkIndex(): number {
        const lastChunkFileId: number | undefined = this.sequence.toReversed().find((chunkOrFree: number | '.') => typeof chunkOrFree === 'number');

        if (lastChunkFileId === undefined) {
            return -1;
        }

        return this.sequence
            .lastIndexOf(lastChunkFileId);
    }

    getFirstFileChunkIndex(): number {
        return this.sequence.findIndex((chunkOrFree: number | '.') => typeof chunkOrFree === 'number');
    }

    toString() {
        return this.sequence.join('');
    }

    defrag(): void {
        const lastChunkIndex = this.getLastChunkIndex();
        const lastChunk = this.sequence[lastChunkIndex];
        const firstFreeSpaceIndex = this.getFirstFreeSpaceIndex();

        this.sequence[firstFreeSpaceIndex] = lastChunk;
        this.sequence[lastChunkIndex] = '.';
    }

    isFullyDefrag(): boolean {
        return !!this.sequence.join('').match(/^[0-9]*[.]*$/);
    }

    clone() {
        return new FS([...this.sequence]);
    }

    getChecksum() {
        return this.sequence.slice(0, this.getFirstFreeSpaceIndex()).reduce(
            (prev: number, curr: number | '.', currentIndex: number) => {
                const checksumbase = typeof curr === 'number' ? (curr * currentIndex) : 0;
                return prev + checksumbase;
            }, 0);
    }
}

class FSP2 {

    constructor(public files: (File | FreeSpace)[]) {
    }

    allocate(freeSpace: FreeSpace, file: File): [File, FreeSpace] {
        return [file, new FreeSpace(freeSpace.size - file.size)];
    }

    isFile(f: File | FreeSpace): f is File {
        return (f as File).chunks !== undefined;
    }

    isFreeSpace(f: File | FreeSpace): f is FreeSpace {
        return (f as File).chunks === undefined;
    }

    getFirstFreeSpaceIndex(): number {
        return this.files.findIndex((f: File | FreeSpace) => this.isFreeSpace(f));
    }

    getLastChunkIndex(maxSize: number, from: number): number {
        return this.files.findLastIndex((f: File | FreeSpace, index: number) => index >= from && this.isFile(f) && f.size <= maxSize);
    }

    toString() {
        return this.files.map((file: File | FreeSpace) => {
            if (this.isFile(file)) {
                return file.chunks.join('')
            } else {
                return new Array(file.size).join('.');
            }
        }).join('');
    }

    toFSP1(): FS {
        return new FS(this.files.map((file: File | FreeSpace) => {
            if (this.isFile(file)) {
                return file.chunks
            } else {
                return new Array(file.size);
            }
        }).flat());
    }

    defrag(): boolean {

        let start = 0;
        let firstFreeSpaceIndex = -1;
        let quit = 0;
        while (quit < 30) {
            firstFreeSpaceIndex = this.getNextFreeSpaceIndex(start)
            if (firstFreeSpaceIndex < 0) {
                return false;
            }
            const emptySpace: FreeSpace = this.files[firstFreeSpaceIndex] as FreeSpace;
            const lastChunkIndex: number = this.getLastChunkIndex(emptySpace.size, firstFreeSpaceIndex);
            const lastChunk: File = this.files[lastChunkIndex] as File;
            this.files[firstFreeSpaceIndex] = new FreeSpace(lastChunk.size);
            this.files.splice(firstFreeSpaceIndex, 1, ...this.allocate(emptySpace, lastChunk).filter((f: File | FreeSpace) => f.size > 0));
            start = firstFreeSpaceIndex + 1;
            quit++;
        }

        this.mergeConsecutiveFreeSpace();

        return true;
    }

    getChecksum() {
        return this.toFSP1().getChecksum();
    }

    getNextFreeSpaceIndex(from: number = 0): number {
        return this.files.findIndex((f: File | FreeSpace, index: number) => index >= from && this.isFreeSpace(f));
    }

    private mergeConsecutiveFreeSpace(): void {
        let startIndex: number = -1;
        let merging: boolean = false;
        let acc: number = 0;

        for (let i = 0, j = 0; i < this.files.length && j < 100; i++, j++) {
            const f: FreeSpace | File = this.files[i];
            if (this.isFile(f)) {
                if (merging) {
                    merging = false;
                    this.files.splice(startIndex, i - startIndex, new FreeSpace(acc));
                    acc = 0;
                    i = startIndex;
                    startIndex = -1;
                }
                // End merge
                continue;
            }
            if (startIndex < 0) {
                startIndex = i;
            }
            acc += f.size;
            merging = true;
        }
        this.files.splice(startIndex, this.files.length - startIndex, new FreeSpace(acc));
    }
}

export class Exercise92024 extends Exercise {
    aocDay: number = 9;
    aocYear: number = 2024;
    aocName: string = 'N/C';

    getPart1Result(): number {
        const fs = new FS(input.split('').map((value, index) => {
                if (index % 2 === 0) {
                    return new Array(+value).fill([index / 2]);
                } else {
                    return new Array(+value).fill(['.']);
                }
            }).flat(2)
        );

        while (!fs.isFullyDefrag()) {
            fs.defrag();
        }


        return fs.getChecksum();
    }

    getPart2Result(): number {
        const fs = new FSP2(input.split('').map((value, index) => {
                if (index % 2 === 0) {
                    return new File(index / 2, new Array(+value).fill([index / 2]));
                } else {
                    return new FreeSpace(+value);
                }
            }).flat(2)
        );

        let i = 0;

        while (fs.defrag() && i < 30) {
            i++
        }


        return fs.getChecksum();
    }
}
