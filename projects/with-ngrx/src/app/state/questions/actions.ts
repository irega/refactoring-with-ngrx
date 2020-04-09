import { createAction, props } from '@ngrx/store';
import { Question } from './entities';

export enum QuestionsActionTypes {
  LOAD = '[Questions] Load',
  CREATE = '[Questions] Create',
  CREATE_SUCCESS = '[Questions] Create Success',
  CREATE_ERROR = '[Questions] Create Error',
  EDIT = '[Questions] Edit',
  EDIT_SUCCESS = '[Questions] Edit Success',
  EDIT_ERROR = '[Questions] Edit Error'
}

export const load = createAction(QuestionsActionTypes.LOAD, props<{ payload: { questions: Question[] } }>());
export const create = createAction(QuestionsActionTypes.CREATE, props<{ payload: { text: string } }>());
export const createSuccess = createAction(
  QuestionsActionTypes.CREATE_SUCCESS,
  props<{ payload: { question: Question } }>()
);
export const createError = createAction(QuestionsActionTypes.CREATE_ERROR);
export const edit = createAction(QuestionsActionTypes.EDIT, props<{ payload: { question: Question } }>());
export const editSuccess = createAction(
  QuestionsActionTypes.EDIT_SUCCESS,
  props<{ payload: { question: Question } }>()
);
export const editError = createAction(QuestionsActionTypes.EDIT_ERROR);
