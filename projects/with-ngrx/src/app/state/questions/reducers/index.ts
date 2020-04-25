import { createReducer, on } from '@ngrx/store';
import {
  load,
  create,
  createSuccess,
  createError,
  edit,
  editSuccess,
  editError,
  deleteQuestion,
  deleteQuestionSuccess,
  deleteQuestionError,
  toggle,
  toggleError,
  toggleSuccess
} from '../actions';
import { LOAD } from './load';
import { CREATE, CREATE_ERROR, CREATE_SUCCESS } from '../reducers/create';
import { EDIT, EDIT_SUCCESS, EDIT_ERROR } from './edit';
import { DELETE_SUCCESS, DELETE, DELETE_ERROR } from './delete';
import { TOGGLE, TOGGLE_SUCCESS, TOGGLE_ERROR } from './toggle';

const initialState = [];

const _questionsReducer = createReducer(
  initialState,
  on(load, LOAD),
  on(create, CREATE),
  on(createSuccess, CREATE_SUCCESS),
  on(createError, CREATE_ERROR),
  on(edit, EDIT),
  on(editSuccess, EDIT_SUCCESS),
  on(editError, EDIT_ERROR),
  on(deleteQuestion, DELETE),
  on(deleteQuestionSuccess, DELETE_SUCCESS),
  on(deleteQuestionError, DELETE_ERROR),
  on(toggle, TOGGLE),
  on(toggleSuccess, TOGGLE_SUCCESS),
  on(toggleError, TOGGLE_ERROR)
);

export function questionsReducer(state, action) {
  return _questionsReducer(state, action);
}
