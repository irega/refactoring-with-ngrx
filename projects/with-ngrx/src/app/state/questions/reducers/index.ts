import { createReducer, on } from '@ngrx/store';
import { load } from '../actions';
import { LOAD } from './load';

const initialState = [];

const _questionsReducer = createReducer(initialState, on(load, LOAD));

export function questionsReducer(state, action) {
  return _questionsReducer(state, action);
}
