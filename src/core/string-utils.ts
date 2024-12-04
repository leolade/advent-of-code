export function multipleIndexOfChar(s: string, criteria: string): number[] {
    const results = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === criteria) results.push(i);
    }
    return results;
}
