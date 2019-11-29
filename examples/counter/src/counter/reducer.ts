import { CounterActions } from './actions';

export const counterReducer = (state = 0, action: CounterActions) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};
