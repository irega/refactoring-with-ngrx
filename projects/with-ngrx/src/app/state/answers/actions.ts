import { createAction, props } from '@ngrx/store';
import { Answer } from './entities';

export enum AnswersActionTypes {
  LOAD = '[Answers] Load',
  CREATE = '[Answers] Create',
  CREATE_SUCCESS = '[Answers] Create success',
  CREATE_ERROR = '[Answers] Create error'
}

export const load = createAction(AnswersActionTypes.LOAD, props<{ payload: { answers: Answer[] } }>());
export const create = createAction(AnswersActionTypes.CREATE, props<{ payload: { answer: Answer } }>());
export const createSuccess = createAction(AnswersActionTypes.CREATE_SUCCESS, props<{ payload: { answer: Answer } }>());
export const createError = createAction(AnswersActionTypes.CREATE_ERROR);
