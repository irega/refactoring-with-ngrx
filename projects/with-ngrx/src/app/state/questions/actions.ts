import { createAction, props } from '@ngrx/store';
import { Question } from './entities';

export enum QuestionsActionTypes {
  LOAD = '[Questions] Load',
  CREATE = '[Questions] Create',
  CREATE_SUCCESS = '[Questions] Create Success',
  CREATE_ERROR = '[Questions] Create Error',
  EDIT = '[Questions] Edit',
  EDIT_SUCCESS = '[Questions] Edit Success',
  EDIT_ERROR = '[Questions] Edit Error',
  DELETE = '[Questions] Delete',
  DELETE_SUCCESS = '[Questions] Delete Success',
  DELETE_ERROR = '[Questions] Delete Error',
  TOGGLE = '[Questions] Toggle',
  TOGGLE_SUCCESS = '[Questions] Toggle Success',
  TOGGLE_ERROR = '[Questions] Toggle Error'
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
export const deleteQuestion = createAction(QuestionsActionTypes.DELETE, props<{ payload: { questionId: number } }>());
export const deleteQuestionSuccess = createAction(
  QuestionsActionTypes.DELETE_SUCCESS,
  props<{ payload: { questionId: number } }>()
);
export const deleteQuestionError = createAction(QuestionsActionTypes.DELETE_ERROR);
export const toggle = createAction(QuestionsActionTypes.TOGGLE, props<{ payload: { questionId: number } }>());
export const toggleSuccess = createAction(
  QuestionsActionTypes.TOGGLE_SUCCESS,
  props<{ payload: { questionId: number } }>()
);
export const toggleError = createAction(QuestionsActionTypes.TOGGLE_ERROR);
