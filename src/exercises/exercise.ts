export abstract class Exercise {
  abstract aocYear: number;
  abstract aocDay: number;
  abstract aocName: string;

  getPart1Result(): string {
    throw new Error('Not implemented yet');
  }
  getPart2Result(): string {
    throw new Error('Not implemented yet');
  }
}
