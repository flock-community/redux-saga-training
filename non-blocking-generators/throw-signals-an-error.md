# Throw signals an error

`throw()` throws an exception at the location of the `yield` that led to the last suspension of the generator. Let’s examine how that works via the following generator function.

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

In the following interaction, we first use `next()` to start the generator and proceed until the `yield` in line A. Then we throw an exception from that location.

```javascript
> const genObj1 = genFunc1();

> genObj1.next()
Started
{ value: undefined, done: false }

> genObj1.throw(new Error('Problem!'))
Caught: Error: Problem!
{ value: undefined, done: true }
```

The result of `throw()` \(shown in the last line\) stems from us leaving the function with an implicit `return`.

