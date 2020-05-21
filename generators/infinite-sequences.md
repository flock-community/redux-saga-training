# Infinite sequences

As seen before, Generator have similarities with Array's. They both specify a sequence which can be iterated in a specific order. A big difference is that Generator's are lazy and don't store any collection in memory, except when you ask them to do so. This fact allows infinite mathematical sequences, such as the natural numbers or the primes, to be expressed elegantly using a generator function. 

One common utility function for creating such sequences is the following:

```typescript
function* sequence<T>(seed: T, next: (t: T) => T) {
  for (let value = seed; ; value = next(seed)) yield value;
}
```

Which allows the naturals to be expressed as:

```typescript
function naturals() {
  return sequence(0, (i) => i + 1);
}
```

Note the similarity with a sequence in mathematics:

$$
x_0 = 0 \\
\;\;\;\;\;x_{n+1} = x_n + 1
$$

To make those infinite sequence useful, you will often use helper functions like `take` or `takeWhile`: 

```typescript
function* take<T>(iterable: Iterable<T>, n: number) {
  let i = 0;
  for (const item of iterable) {
    if (i === n) break;
    yield item;
    i++;
  }
}

```

{% tabs %}
{% tab title="Exercise 4" %}
Implement the following `takeWhile` function:

```typescript
function* takeWhile<T>(iterable: Iterable<T>, predicate: (t: T) => boolean) {
 // implement
}

test('Exercise 4', () => {
  const squaredSmallerThan50 = takeWhile(naturals(), (i) => i ** 2 <= 50);
  expect(Math.max(...squaredSmallerThan50)).toStrictEqual(7);

  let negativeGreaterThanMinus50 = takeWhile(sequence(-5, i => i - 1), (i) => i > -50);
  expect(Math.min(...negativeGreaterThanMinus50)).toStrictEqual(-49);
});

```
{% endtab %}

{% tab title="Solution" %}
```typescript
function* takeWhile<T>(iterable: Iterable<T>, predicate: (t: T) => boolean) {
  for (const item of iterable) {
    if (!predicate(item)) break;
    yield item;
  }
}


```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="Exercise 5" %}
Implement the primes using a generator function.  
  
Tip: use a helper function isPrime, otherwise you would need to use loop labels.

```typescript
function* primes(): Generator<number> {
  // implement
}

function isPrime(p: number): boolean {
  // implement
}

test('Exercise 5', () => {
  expect([...takeWhile(primes(), (i) => i < 100)]).toStrictEqual([
    2,
    3,
    5,
    7,
    11,
    13,
    17,
    19,
    23,
    29,
    31,
    37,
    41,
    43,
    47,
    53,
    59,
    61,
    67,
    71,
    73,
    79,
    83,
    89,
    97,
  ]);
});

```
{% endtab %}

{% tab title="Solution" %}
```typescript
function* primes() {
  for (const p of naturals(2)) {
    if (isPrime(p)) yield p;
  }
}

function isPrime(p: number) {
  for (const n of takeWhile(naturals(2), (n) => n < p)) {
    if (p % n === 0) return false;
  }
  return true;
}
```
{% endtab %}
{% endtabs %}



