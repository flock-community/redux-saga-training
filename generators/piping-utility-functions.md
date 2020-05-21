# Piping utility functions

One problem with generators in javascript is that it can leads to code like this:

```javascript
takeWhile(
  map(
    filter(numbers(), (x) => x % 2 === 1),
    (x) => x + x,
  ),
  (x) => x < 1000,
);
```

There is an ecmascript proposal to make this more readable using a pipeline operator. This allows for a similar flow also seen with pipe in RxJS. And in other languages that support generators such as Kotlin and Dart, use extension method to give a similar left to right chronological flow.

{% tabs %}
{% tab title="JS pipeline" %}
```javascript
numbers()
  |> filter(x => x % 2 === 1)
  |> map(x => x + x)
  |> takeWhile(x => x < 100
```
{% endtab %}

{% tab title="RxJS pipe" %}
```
Observable.from([1, 2, 3]).pipe(
  filter(x => x % 2 === 1),
  map(x => x + x)
)
```
{% endtab %}

{% tab title="Kotlin" %}
```
numbers().asSequence()
  .filter{ it % 2 === 1}
  .map{ it * it }
  .takeWhile{ it < 100 }
```
{% endtab %}

{% tab title="Dart" %}
```
numbers()
  .filter(x => x % 2 === 1)
  .map(x => x + x)
  .takeWhile(x => x < 100
```
{% endtab %}
{% endtabs %}

It is also possible to make a giant wrapper class that has all those methods. However, this is a bad practice in Javascript as this doesn't allow for three shaking unused code. This is also the reason RxJS migrated to using the pipe method that can compose three shakable top level functions.

