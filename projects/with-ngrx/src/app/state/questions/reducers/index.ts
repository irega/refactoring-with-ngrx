import { createReducer, on } from '@ngrx/store';
import {
  create,
  createError,
  createSuccess,
  deleteQuestion,
  deleteQuestionError,
  deleteQuestionSuccess,
  edit,
  editError,
  editSuccess,
  load,
  toggle,
  toggleError,
  toggleSuccess
} from '../actions';
import { CREATE, CREATE_ERROR, CREATE_SUCCESS } from './create/create';
import { DELETE, DELETE_ERROR, DELETE_SUCCESS } from './delete/delete';
import { EDIT, EDIT_ERROR, EDIT_SUCCESS } from './edit/edit';
import { LOAD } from './load/load';
import { TOGGLE, TOGGLE_ERROR, TOGGLE_SUCCESS } from './toggle/toggle';

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
