# Awaiting promises

In the last section we saw how generators can be used to produce _many_ values _asynchronous_. However, redux-saga uses generators not only produce many values. In redux the saga the values that a generator produces are called _effects._ Those effects instructs the caller how to perform side effects \(such as making a http request\). 

When you can call a generator object with next, you effectively say, execute the generator function until the first `yield` and then pause the generator function until instructed to resume and execute until the next `yield`.

In this way, the caller of the function is in control, of how long a function needs to be paused. This control is inverted if you look at async function, where the function itself is in control of how long it will wait.

So say we have a generator function like this:

```javascript
function* generatorFn() {
  console.log('first part of function executed');
  yield 1;
  console.log('second part of function executed');
  yield 5;
  console.log('third part of function executed');
  yield 10;
  console.log('last part of function executed')
}
  
```

Then the caller can decide to wait for those values for value amount of seconds. Such as below:

```javascript
function runGenerator(genFunc) {
  const genObj = genFunc();
  step(genObj.next());

  function step({ value, done }) {
    if (!done) {
      setTimeout(() => step(genObj.next()), value * 1000);
    }
  }
}
```

Pasting this in your browser console will give:

```javascript
> runGenerator(generatorFn);
'first part of function executed'
'second part of function executed'
'third part of function executed'
'last part of function executed'
```

However, for a unit test, we can still run this code synchronously, if we prefer:

```javascript
> [...generatorFn()]
[1, 5, 10]
```

Redux saga uses this pattern to its advantage. By inverting the control, it allows generators te be implemented as _pure_ functions. 

{% hint style="info" %}
A pure function is a function that has no side effects and `returns` the same value when given the same parameters. For generators, this means that it `yield` the same values, given the same parameters.

If a function is pure, it is easier to test, and often easier to reason about. 
{% endhint %}

{% tabs %}
{% tab title="Exercise 6" %}
We are now going to implement of redux saga ourself. In redux saga, every promise that is yielded, will be awaited before continuing. Mimic this behaviour with a runGenerator function:

```javascript
function runGenerator(genFunc) {
  // implement
}

test('Exercise 6', () => {
  runGenerator(generatorFn);
});

function* generatorFn() {
  console.log('first part of function executed');
  yield delay(100)
  console.log('second part of function executed');
  yield delay(500)
  console.log('third part of function executed');
  yield delay(1000);
  console.log('last part of function executed');
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

```
{% endtab %}

{% tab title="Solution" %}
```javascript
function runGenerator(genFunc) {
  const genObj = genFunc();
  step(genObj.next());

  function step({ value, done }) {
    if (!done) {
      value.then(() => {
        step(genObj.next());
      });
    }
  }
}
```
{% endtab %}
{% endtabs %}

