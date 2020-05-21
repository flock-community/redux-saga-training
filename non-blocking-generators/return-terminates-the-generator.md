# Return terminates the generator

`return()` performs a `return` at the location of the `yield` that led to the last suspension of the generator. Let’s use the following generator function to see how that works.

```javascript
function* genFunc1() {
  try {
    console.log('Started');
    yield; // (A)
    console.log('Progessing');
    yield; // (A)
  } finally {
    console.log('Exiting');
  }
}
```

In the following interaction, we first use `next()` to start the generator and to proceed until the `yield` in line A. Then we return from that location via `return()`.

```javascript
> const genObj1 = genFunc1();
> genObj1.next()
Started
{ value: undefined, done: false }
> genObj1.return('Result')
Exiting
{ value: 'Result', done: true }
```



