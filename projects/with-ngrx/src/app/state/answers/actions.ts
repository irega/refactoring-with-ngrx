import { createAction, props } from '@ngrx/store';
import { Answer } from './entities';

export enum AnswersActionTypes {
  LOAD = '[Answers] Load',
  CREATE = '[Answers] Create',
  CREATE_SUCCESS = '[Answers] Create success',
  CREATE_ERROR = '[Answers] Create error',
  EDIT = '[Answers] Edit',
  EDIT_SUCCESS = '[Answers] Edit success',
  EDIT_ERROR = '[Answers] Edit error',
  DELETE = '[Answers] Delete',
  DELETE_SUCCESS = '[Answers] Delete success',
  DELETE_ERROR = '[Answers] Delete error'
}

export const load = createAction(AnswersActionTypes.LOAD, props<{ payload: { answers: Answer[] } }>());
export const create = createAction(AnswersActionTypes.CREATE, props<{ payload: { answer: Answer } }>());
export const createSuccess = createAction(AnswersActionTypes.CREATE_SUCCESS, props<{ payload: { answer: Answer } }>());
export const createError = createAction(AnswersActionTypes.CREATE_ERROR);
export const edit = createAction(AnswersActionTypes.EDIT, props<{ payload: { answer: Answer } }>());
export const editSuccess = createAction(AnswersActionTypes.EDIT_SUCCESS, props<{ payload: { answer: Answer } }>());
export const editError = createAction(AnswersActionTypes.EDIT_ERROR);
export const deleteAnswer = createAction(AnswersActionTypes.DELETE, props<{ payload: { answerId: number } }>());
export const deleteAnswerSuccess = createAction(
  AnswersActionTypes.DELETE_SUCCESS,
  props<{ payload: { answerId: number } }>()
);
export const deleteAnswerError = createAction(AnswersActionTypes.DELETE_ERROR);
