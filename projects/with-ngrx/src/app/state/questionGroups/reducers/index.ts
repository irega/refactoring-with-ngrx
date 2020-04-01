import { createReducer, on } from '@ngrx/store';
import {
  loadSuccess,
  load,
  loadError,
  create,
  deleteQuestionGroup,
  deleteQuestionGroupError,
  deleteQuestionGroupSuccess,
  editError,
  editSuccess,
  edit,
  createError,
  createSuccess
} from '../actions';
import { LOAD, LOAD_SUCCESS, LOAD_ERROR } from './load/load';
import { DELETE_SUCCESS, DELETE_ERROR, DELETE } from './delete/delete';
import { EDIT_ERROR, EDIT, EDIT_SUCCESS } from './edit/edit';
import { CREATE_SUCCESS, CREATE, CREATE_ERROR } from './create/create';

const initialState = [];

const _questionGroupsReducer = createReducer(
  initialState,
  on(load, LOAD),
  on(loadSuccess, LOAD_SUCCESS),
  on(loadError, LOAD_ERROR),
  on(create, CREATE),
  on(createSuccess, CREATE_SUCCESS),
  on(createError, CREATE_ERROR),
  on(edit, EDIT),
  on(editSuccess, EDIT_SUCCESS),
  on(editError, EDIT_ERROR),
  on(deleteQuestionGroup, DELETE),
  on(deleteQuestionGroupSuccess, DELETE_SUCCESS),
  on(deleteQuestionGroupError, DELETE_ERROR)
);

export function questionGroupsReducer(state, action) {
  return _questionGroupsReducer(state, action);
}
