function sum(iterator: Iterator<number>) {
  let sum = 0;
  // some while loop that adds al the items of the iterator
  return sum;
}

test('Exercise 2', () => {
  const set = new Set([1, 1, 2, 2, 3, 3]);
  const iterator = set[Symbol.iterator]();
  expect(sum(iterator)).toEqual(6);
});
