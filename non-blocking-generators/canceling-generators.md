# Canceling generators

One other thing that generators allow \(and async functions don't\) is cancelling a generator.

If we look at the example of the introduction:

```typescript
function* watchKeyUp() {
  let last = null;
  while (true) {
    const event = yield take(keyupChannel);
    const value = 
    if (value != null) continue; // filter
    if (value === last) continue; // distinctUntilChanged
    last = value;
    const response = yield fetch(`/autocomplete/${value}`).then(it => it.json())
    yield put(autocompleteAction.success(response));
    yield delay(500); // throttle
  }
}
```

Then it may look dangerous to have a while loop, that never breaks. And if we would have used an async function here, and awaited the promises, that would have certainly be the case. Once the loop starts, we can not break it anymore.

However, with generators, the caller of the function is able to \(effectively\) break a look from the outside. For this we look at the other half of the Iterator protocol.

```typescript
interface Iterator<T, R> {
  next(): { value: T; done: boolean };
  return(r: R): {value: R, done: true}
  throw(e: any): {value: undefined, done: true};
}
```

This looks like this:

```typescript
function* manageInteractions() {
  // start listening
  const generator = watchKeyUp();
  run(watchKeyUp);
  
  // wait for an action and stop listening
  yield take(TEXTAREA_REMOVED);
  generator.return();
}
```

The return effectively breaks the while loop at the yield where the generator is pausing at that point. In large applications, new user interaction may make it unnecessary to continue with the current generator. For example, when fetching data that is not relevant anymore in a new view that is entered.

In this way, generators \(or async generators\) are much better suited for handling "many" asynchronous data than async functions are.

{% tabs %}
{% tab title="Exercise 7 " %}
Implement a function that logs values endlessly, for example, the natural numbers or the primes, and then cancel it after a delay of 2000 ms.

```typescript
function* logEndlessly() {
  // implement
}

test('Exercise 7', async () => {
  let generator = logEndlessly();
  runGenerator(generator);
  await delay(2000);
  
  // implement canceling the generator
  
});

function runGenerator(genObj) {
  step(genObj.next());

  function step({ value, done }) {
    if (!done) {
      setTimeout(() => step(genObj.next()), 0);
    }
  }
}
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

function* logEndlessly() {
  for (const item of primes()) {
    yield item;
    console.log(item);
  }
}

test('Exercise 7', async () => {
  let generator = logEndlessly();
  runGenerator(generator);
  await delay(2000);

  // implement canceling the generator
  console.log(generator.return());
});
                
```
{% endtab %}
{% endtabs %}

In short, `return(x)` executes `return x` at the location of the `yield` that the generator is pausing at. Similarly, `throw(x)` executes `throw x` at the location of `yield`.

