import { createReducer, on } from '@ngrx/store';
import { load, create, createSuccess, createError } from '../actions';
import { LOAD } from './load';
import { CREATE_ERROR, CREATE_SUCCESS, CREATE } from './create';

const initialState = [];

const _answersReducer = createReducer(
  initialState,
  on(load, LOAD),
  on(create, CREATE),
  on(createSuccess, CREATE_SUCCESS),
  on(createError, CREATE_ERROR)
);

export function answersReducer(state, action) {
  return _answersReducer(state, action);
}
