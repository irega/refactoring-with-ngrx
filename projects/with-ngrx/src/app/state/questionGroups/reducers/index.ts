import { createReducer, on } from '@ngrx/store';
import { loadSuccess, load, loadError } from '../actions';
import { LOAD, LOAD_SUCCESS, LOAD_ERROR } from './load/load';

const initialState = [];

const _questionGroupsReducer = createReducer(
  initialState,
  on(load, LOAD),
  on(loadSuccess, LOAD_SUCCESS),
  on(loadError, LOAD_ERROR)
);

export function questionGroupsReducer(state, action) {
  return _questionGroupsReducer(state, action);
}
