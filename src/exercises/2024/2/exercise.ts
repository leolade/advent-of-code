import {Exercise} from '../../exercise';
import {input} from './input';

type Direction = 'ASC' | 'DESC';

export class Exercise22024 extends Exercise {
    aocDay: number = 2;
    aocYear: number = 2024;
    aocName: string = 'Red-Nosed Reports';

    getPart1Result(): number {
        const reports: number[][] = input.split('\n')
            .map((report: string) => report.split(' ').map((reportItem: string) => parseInt(reportItem)))

        return reports.filter((report: number[]) => {
            if (report.length < 2) {
                return false;
            }
            const direction: Direction = report[0] > report[1] ? 'DESC' : 'ASC';
            let isSafe: boolean = true;
            let i = 0;
            let j = 1;
            while (isSafe && j < report.length) {
                const differ: number = report[i] - report[j];
                if (differ === 0 || Math.abs(differ) > 3) {
                    isSafe = false;
                }
                if (differ > 0 && direction !== 'DESC') {
                    isSafe = false;
                }
                if (differ < 0 && direction !== 'ASC') {
                    isSafe = false;
                }
                i++;
                j++;
            }
            return isSafe;
        }).length;
    }

    getPart2Result(): number {
        const reports: number[][] = input.split('\n')
            .map((report: string) => report.split(' ').map((reportItem: string) => parseInt(reportItem)))

        return reports.filter((report: number[]) => {
            return this.isSafe(report, true);
        }).length;
    }

    isSafe(report: number[], tolerance: boolean): boolean {
        if (report.length < 2) {
            return false;
        }
        const direction: Direction = report[0] > report[1] ? 'DESC' : 'ASC';
        let unsafeCounter: number = 0;
        let i = 0;
        let j = 1;
        while (unsafeCounter < 3 && j < report.length) {
            const differ: number = report[i] - report[j];
            if (differ === 0 || Math.abs(differ) > 3) {
                unsafeCounter++;
            } else if (differ > 0 && direction !== 'DESC') {
                unsafeCounter++;
            } else if (differ < 0 && direction !== 'ASC') {
                unsafeCounter++;
            }
            i++;
            j++;
        }
        if (!tolerance) {
            return unsafeCounter === 0;
        }
        let isSafe: boolean = false;
        for (i = 0; i < report.length; i++) {
            const reportWithoutBadLevel: number[] = report.slice(0, i).concat(report.slice(i+1));
            if (this.isSafe(reportWithoutBadLevel, false)) {
                isSafe = true;
                break;
            }
        }
        return isSafe;

    }
}
