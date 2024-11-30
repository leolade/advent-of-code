export function toNumberArray(s: string): number[] {
  return s.split('\n').map((s: string) => parseInt(s));
}
