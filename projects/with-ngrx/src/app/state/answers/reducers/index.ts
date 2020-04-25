import { createReducer, on } from '@ngrx/store';
import { load } from '../actions';
import { LOAD } from './load';

const initialState = [];

const _answersReducer = createReducer(initialState, on(load, LOAD));

export function answersReducer(state, action) {
  return _answersReducer(state, action);
}
