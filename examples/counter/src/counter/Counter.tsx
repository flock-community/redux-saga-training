import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../core/actions';
import { Dispatch } from 'redux';
import { counterSelector } from './selector';

export function Counter() {
  const value = useSelector(counterSelector);
  const dispatch = useDispatch<Dispatch<Actions>>();

  return (
    <p>
      Clicked: {value} times <button onClick={increment}>+</button>{' '}
      <button onClick={decrement}>-</button>{' '}
      <button onClick={incrementIfOdd}>Increment if odd</button>{' '}
      <button onClick={incrementAsync}>Increment async</button>
    </p>
  );

  function increment() {
    dispatch({ type: 'INCREMENT' });
  }

  function decrement() {
    dispatch({ type: 'DECREMENT' });
  }

  function incrementAsync() {
    dispatch({ type: 'INCREMENT_ASYNC' });
  }

  function incrementIfOdd() {
    dispatch({ type: 'INCREMENT_IF_ODD' });
  }
}
