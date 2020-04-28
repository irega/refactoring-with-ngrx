import { createReducer, on } from '@ngrx/store';
import {
  load,
  create,
  createSuccess,
  createError,
  editSuccess,
  edit,
  editError,
  deleteAnswerSuccess,
  deleteAnswer,
  deleteAnswerError
} from '../actions';
import { LOAD } from './load';
import { CREATE_ERROR, CREATE_SUCCESS, CREATE } from './create';
import { DELETE_ERROR, DELETE_SUCCESS, DELETE } from './delete';
import { EDIT_ERROR, EDIT_SUCCESS, EDIT } from './edit';

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
