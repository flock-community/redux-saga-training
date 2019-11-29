import { combineReducers } from 'redux';
import { counterReducer as counter } from '../counter/reducer';

export type State = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  counter,
});
