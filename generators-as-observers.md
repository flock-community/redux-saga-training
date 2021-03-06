# Generators as observers

As consumers of data, generator objects conform to the second half of the generator interface, `Observer`:

```javascript
interface Observer {
    next(value? : any) : void;
    return(value? : any) : void;
    throw(error) : void;
}
```

As an observer, a generator pauses until it receives input. There are three kinds of input, transmitted via the methods specified by the interface:

* `next()` sends normal input.
* `return()` terminates the generator.
* `throw()` signals an error.

**Sending values via next\(\)** 

If you use a generator as an observer, you send values to it via `next()` and it receives those values via `yield`:

```javascript
function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`); // (A)
  console.log(`2. ${yield}`);
  return 'result';
}
```

Let’s use this generator interactively. First, we create a generator object:

```javascript
> const genObj = dataConsumer();
```

We now call `genObj.next()`, which starts the generator. Execution continues until the first `yield`, which is where the generator pauses. The result of `next()` is the value yielded in line A \(`undefined`, because `yield` doesn’t have an operand\).

```javascript
> genObj.next()
Started
{ value: undefined, done: false }
```

We call `next()` two more times, in order to send the value `'a'` to the first `yield` and the value `'b'` to the second `yield`:

```javascript
> genObj.next('a')
1. a
{ value: undefined, done: false }

> genObj.next('b')
2. b
{ value: 'result', done: true }
```

The result of the last `next()` is the value returned from `dataConsumer()`. `done` being `true` indicates that the generator is finished.

Unfortunately, `next()` is asymmetric, but that can’t be helped: It always sends a value to the currently suspended `yield`, but returns the operand of the following `yield`.

```javascript
function* genFunc1() {
  try {
    console.log('Started');
    yield; // (A)
  } catch (error) {
    console.log('Caught: ' + error);
  }
}
```

 

