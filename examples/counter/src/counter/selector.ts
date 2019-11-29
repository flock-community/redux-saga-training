import { State } from '../core/reducer';

export function counterSelector(state: State) {
  return state.counter;
}
