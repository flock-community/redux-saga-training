# A generator is an Iterable

The `Generator` type also implements the Iterable interface.

```typescript
interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

```

This can be seen as that every `Iterable` has a special method returning an `Iterator` that shows how to iterate it. This method `[Symbol.iterator]` is used internally whenever you use a `for ... of` loop. So `Array` implements the Iterable interface, but `String`, `Map` and `Set` are also built-in `Iterable`'s in JavaScript. For example, try pasting this in your browser console.

```typescript
for (const item of new Set(['s', 'e', 't'])) {
  console.log(item);
}

for (const item of 'iterate me😀') {
  console.log(item);
}

for (const [key, value] of new Map([['key', 'value']])) {
  console.log(key, value);
}

```

And as said, a `Generator` object can is `Iterable` as well.

{% tabs %}
{% tab title="TS" %}
```typescript
function* range(start: number, stop: number, step: number = 1) {
  for (let i = start; i <= stop; i += step) yield i;
}

for (const item of range(1, 10)) {
  console.log(item);
}
```
{% endtab %}

{% tab title="JS" %}
```typescript
function* range(start, stop, step = 1) {
  for (let i = start; i <= stop; i += step) yield i;
}

for (const item of range(1, 10)) {
  console.log(item);
}

```
{% endtab %}
{% endtabs %}

Other important language constructs that can be used with Iterable are _spreading_ and _destructuring._ 

```typescript
> [...range(1, 5)]
[1, 2, 3, 4, 5]
> Math.max(...range(1, 5)]
5
> const [x, y] = range(1, 5);
> x
1
> y
2
```

{% tabs %}
{% tab title="Exercise 3" %}
Use the spreading operator to ****capitalize a string.

```typescript
function capitalize(iterable: Iterable<string>) {
  // implement
}

test('Exercise 3', () => {
  expect(capitalize('hello')).toEqual('Hello');
  expect(capitalize('hello world')).toEqual('Hello world');
  expect(capitalize(['H', 'e', 'l', 'l', 'o'])).toEqual('Hello');
  expect(capitalize(new Set(['H', 'e', 'l', 'l', 'o']))).toEqual('Helo');
});

```
{% endtab %}

{% tab title="Solution TS" %}
```typescript
function capitalize([first, ...rest]: Iterable<string>) {
  return first.toUpperCase() + rest.join('');
}

test('Exercise 3', () => {
  expect(capitalize('hello')).toEqual('Hello');
  expect(capitalize('hello world')).toEqual('Hello world');
  expect(capitalize(['H', 'e', 'l', 'l', 'o'])).toEqual('Hello');
  expect(capitalize(new Set(['H', 'e', 'l', 'l', 'o']))).toEqual('Helo');
});
```
{% endtab %}
{% endtabs %}



