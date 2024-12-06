export function toString2DArray(s: string): string[][] {
  return s.split('\n').map((s: string) => s.split(''));
}
