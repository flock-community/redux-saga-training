import * as React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import { Counter } from './counter/Counter';
import { rootReducer, State } from './core/reducer';
import { Actions } from './core/actions';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './core/saga';

function initialize() {
  const sagaMiddleware = createSagaMiddleware();
  const store: Store<State, Actions> = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return ReactDOM.render(
    <Provider store={store}>
      <Counter />
    </Provider>,
    document.getElementById('root'),
  );
}

initialize();
