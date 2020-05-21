# The 4 different kind of functions

There are 4 different kind of functions in javascript. Of course, the first kind, that shipped in 1995, will look very familiar to you.

{% tabs %}
{% tab title="TS" %}
```typescript
function square(x: number): number {
  return x ** 2;
}
```
{% endtab %}

{% tab title="JS" %}
```javascript
function square(x) {
  return x ** 2;
}
```
{% endtab %}
{% endtabs %}

The second kind of function was introduced 20 years later in 2015. It is called the generator function, and is the function used in `redux-saga` since the end of 2015 to make managing side effects \(such as asynchronous things\) much easier to manage and test. Here is an example of a generator function:

{% tabs %}
{% tab title="TS" %}
```typescript
function* greaterThan(x: number): Generator<number> {
  for (let i = x + 1; ; i++) yield i;
}
```
{% endtab %}

{% tab title="JS" %}
```javascript
function* greaterThan(x) {
  for (let i = x + 1; ; i++) yield i;
}
```
{% endtab %}
{% endtabs %}

The rest of this course will explain in detail everything about this function. But for now, it is most important to think about this as a function, that can doesn't `return` one thing, but returns \(or better `yield`s\) many things. And you see in the example, it can even return infinite many things. We will see later how we can respect the physical reality of a computer while working with infinite sequences such as the natural numbers or the primes.

In 2017 the async function was introduced, which allowed for returning values asynchronously, while writing a function that looked surprisingly similar to the function introduced in 1995.

{% tabs %}
{% tab title="TS" %}
```typescript
async function squareItLater(x: number, ms: number): Promise<number> {
  await new Promise(resolve => setTimeout(resolve, ms));
  return x ** 2;
}
```
{% endtab %}

{% tab title="JS" %}
```javascript
async function squareItLater(x, ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
  return x ** 2;
}
```
{% endtab %}
{% endtabs %}

Then finally in 2019, the async generator function was introduced allowing for many things to be `yield`ed asynchronously.

{% tabs %}
{% tab title="TS" %}
```typescript
async function* greaterThanNonBlocking(x: number): AsyncGenerator<number> {
  for await(const i of greaterThan(x)) {
    // don't block UI interactions
    // while calculating useless infinite mathematical sequences
    await new Promise(resolve => setTimeout(resolve, 0));
    yield i;
  }
}
```
{% endtab %}

{% tab title="JS" %}
```javascript
async function* greaterThanNonBlocking(x) {
  for await(const i of greaterThan(x)) {
    // don't block UI interactions
    // while calculating useless infinite mathematical sequences
    await new Promise(resolve => setTimeout(resolve, 0));
    yield i;
  }
}
```
{% endtab %}
{% endtabs %}

You could say that it took javascript 10 days to ship the first kind of function, and an extra 24 years to ship the 4 functions that complete the 4 different ways that data can be created:

|  | One&lt;E&gt; | Many&lt;E&gt; |
| :--- | :--- | :--- |
| **Synchronous** | function\(...args\): E | function\*\(...args\): Generator&lt;E&gt; |
| **Asynchronous** | async function\(...args\): Promise&lt;E&gt; | async function\* \(...args\): Generator&lt;E&gt; |

