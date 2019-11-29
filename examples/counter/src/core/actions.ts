import { CounterActions } from '../counter/actions';

export type Actions = CounterActions;

export type Action<T extends Actions['type']> = Extract<Actions, { type: T }>;
