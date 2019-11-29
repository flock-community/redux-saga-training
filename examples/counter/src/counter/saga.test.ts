import { incrementIfOdd } from './saga';
import { PutEffect } from 'redux-saga/effects';

describe('incrementIfOdd', () => {
  test('when odd', () => {
    const saga = incrementIfOdd();
    const selectEffect = saga.next().value;
    expect(selectEffect.type).toEqual('SELECT');

    // select result must be mocked
    const counter = 1;

    const putEffect = saga.next(counter).value as PutEffect;
    expect(putEffect.payload.action.type).toEqual('INCREMENT');
  });

  test('when even', () => {
    const saga = incrementIfOdd();
    const selectEffect = saga.next().value;
    expect(selectEffect.type).toEqual('SELECT');

    // select result must be mocked
    const counter = 0;
    expect(saga.next(counter).done).toEqual(true);
  })
});


