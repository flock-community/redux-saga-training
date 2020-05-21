# Preventing termination

You can prevent `return()` from terminating the generator if you yield inside the `finally` clause \(using a `return` statement in that clause is also possible\):

```javascript
function* genFunc2() {
  try {
    console.log('Started');
    yield;
  } finally {
    yield 'Not done, yet!';
  }
}
```

This time, `return()` does not exit the generator function. Accordingly, the property `done` of the object it returns is `false`.

```javascript
> const genObj2 = genFunc2();

> genObj2.next()
Started
{ value: undefined, done: false }

> genObj2.return('Result')
{ value: 'Not done, yet!', done: false }
```

You can invoke `next()` one more time. Similarly to non-generator functions, the return value of the generator function is the value that was queued prior to entering the `finally` clause.

```javascript
> genObj2.next()
{ value: 'Result', done: true }
```

