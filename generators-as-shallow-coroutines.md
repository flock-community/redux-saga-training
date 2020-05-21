# Generators as shallow coroutines

Now we can send values using next, we can in fact also give the resolved value of the promise back to the generator.

```javascript
function runSaga(genFunc) {
    const genObj = genFunc();
    step(genObj.next());

    function step({value,done}) {
        if (!done) {
            // A Promise was yielded
            value
            .then(result => {
                step(genObj.next(result)); // (A)
            })
            .catch(error => {
                step(genObj.throw(error)); // (B)
            });
        }
    }
}
```

This is a very simplified version of what redux saga does under the hood. 

