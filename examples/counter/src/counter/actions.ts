interface Increment {
  type: 'INCREMENT';
}

interface Decrement {
  type: 'DECREMENT';
}

interface IncrementAsync {
  type: 'INCREMENT_ASYNC';
}

interface IncrementIfOdd {
  type: 'INCREMENT_IF_ODD';
}

export type CounterActions = Increment | Decrement | IncrementAsync | IncrementIfOdd;
