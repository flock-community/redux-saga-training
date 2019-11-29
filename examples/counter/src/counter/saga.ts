import { runSaga } from 'redux-saga';
import { all, delay, put, takeEvery, select, call } from 'redux-saga/effects';
import { Actions } from '../core/actions';
import { ofType } from '../core/saga';
import { counterSelector } from './selector';

export function* counterSaga() {
  yield all([
    takeEvery(ofType('INCREMENT_ASYNC'), incrementAsync),
    takeEvery(ofType('INCREMENT_IF_ODD'), incrementIfOdd),
    takeEvery('*', function*(action) {
      yield call(console.log, action);
    }),
  ]);
}

function* incrementAsync() {
  yield delay(1000);
  yield put<Actions>({ type: 'INCREMENT' });
}

export function* incrementIfOdd() {
  const counter: ReturnType<typeof counterSelector> = yield select(counterSelector);
  if (counter % 2 !== 0) {
    yield put<Actions>({ type: 'INCREMENT' });
  }
}
