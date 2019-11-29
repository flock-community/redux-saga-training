import { all, fork } from 'redux-saga/effects';
import { Actions } from './actions';
import { counterSaga } from '../counter/saga';

export function* rootSaga() {
  yield all([fork(counterSaga)]);
}

export function ofType<T extends Actions['type']>(type: T) {
  return (action: any): action is Extract<Actions, { type: T }> => action.type === type;
}
