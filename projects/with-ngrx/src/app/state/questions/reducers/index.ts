import { createReducer, on } from '@ngrx/store';
import { load, create, createSuccess, createError } from '../actions';
import { LOAD } from './load';
import { CREATE, CREATE_ERROR, CREATE_SUCCESS } from '../reducers/create';

const initialState = [];

const _questionsReducer = createReducer(
  initialState,
  on(load, LOAD),
  on(create, CREATE),
  on(createSuccess, CREATE_SUCCESS),
  on(createError, CREATE_ERROR)
);

export function questionsReducer(state, action) {
  return _questionsReducer(state, action);
}
