import { createAction, props } from '@ngrx/store';
import { Question } from './entities';

export enum QuestionsActionTypes {
  LOAD = '[Questions] Load',
  CREATE = '[Questions] Create',
  CREATE_SUCCESS = '[Questions] Create Success',
  CREATE_ERROR = '[Questions] Create Error'
}

export const load = createAction(QuestionsActionTypes.LOAD, props<{ payload: { questions: Question[] } }>());
export const create = createAction(QuestionsActionTypes.CREATE, props<{ payload: { text: string } }>());
export const createSuccess = createAction(
  QuestionsActionTypes.CREATE_SUCCESS,
  props<{ payload: { question: Question } }>()
);
export const createError = createAction(QuestionsActionTypes.CREATE_ERROR);
