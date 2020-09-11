import { createReducer, on } from '@ngrx/store';
import {
  create,
  createError,
  createSuccess,
  deleteAnswer,
  deleteAnswerError,
  deleteAnswerSuccess,
  edit,
  editError,
  editSuccess,
  load
} from '../actions';
import { CREATE, CREATE_ERROR, CREATE_SUCCESS } from './create/create';
import { DELETE, DELETE_ERROR, DELETE_SUCCESS } from './delete/delete';
import { EDIT, EDIT_ERROR, EDIT_SUCCESS } from './edit/edit';
import { LOAD } from './load/load';

const initialState = [];

const _answersReducer = createReducer(
  initialState,
  on(load, LOAD),
  on(create, CREATE),
  on(createSuccess, CREATE_SUCCESS),
  on(createError, CREATE_ERROR),
  on(edit, EDIT),
  on(editSuccess, EDIT_SUCCESS),
  on(editError, EDIT_ERROR),
  on(deleteAnswer, DELETE),
  on(deleteAnswerSuccess, DELETE_SUCCESS),
  on(deleteAnswerError, DELETE_ERROR)
);

export function answersReducer(state, action) {
  return _answersReducer(state, action);
}
