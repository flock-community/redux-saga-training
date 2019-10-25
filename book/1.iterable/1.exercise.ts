function every<T>(iterable: Iterable<T>, predicate: (t: T) => boolean) {
  for (const item of iterable) {
    // TODO
  }
}

test('Exercise 1', () => {
  const string = 'lowercase';
  const set = new Set([2, 4, 6, 8]);
  const map = new Map([
    [0, 'zero'],
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
    [4, 'four'],
    [5, 'five'],
  ]);

  const isLowerCase = s => s.toLowerCase() === s;
  const isEven = i => i % 2 === 0;
  const isNumber = key => typeof key === 'number';

  expect(every(string, isLowerCase)).toBe(true);
  expect(every(set, isEven)).toBe(true);
  expect(every(map, ([key]) => isNumber(key))).toBe(true);
});
