# A generator is an Iterator

Calling a generator function will give you a generator object.

```typescript
const generator: Generator<number> = range(0, 100, 25);
```

The `Generator` type implements the `Iterator` interface:

```typescript
interface Iterator<T> {
  next(): { value: T; done: boolean };
}
```

So we can retrieve the yielded values of a generator also using the `next` method:

```typescript
const generator = range(0, 50, 25);
> generator.next();
{value: 0, done: false}
> generator.next()
{value: 25, done: false}
> generator.next()
{value: 50, done: false}
> generator.next()
{value: undefined, done: true}
```

{% tabs %}
{% tab title="Exercise 2" %}
Implement a loop that iterates the generator directly so that the following test pass.

```typescript
function sum(iterator: Iterator<number>) {
  let sum = 0;
  // some while loop that the items of the iterator
  return sum;
}

test('Exercise 2', () => {
  expect(sum(range(0, 100, 25))).toEqual(250);
  expect(sum(range(0, 10))).toEqual(55);
});

```
{% endtab %}

{% tab title="Solution" %}
Using a `while` loop:

```typescript
function sum(iterator: Iterator<number>) {
  let sum = 0;
  let { value, done } = iterator.next();
  while (!done) {
    sum += value;
    ({ value, done } = iterator.next());
  }
  return sum;
}
```

Using a `for` loop:

```typescript
function sum(iterator: Iterator<number>) {
  let sum = 0;
  for (let result = 0; !result.done; result = iterator.next()) {
    sum += result.value;
  }
  return sum;
}
```
{% endtab %}
{% endtabs %}

## 

