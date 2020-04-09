import { createAction, props } from '@ngrx/store';
import { QuestionGroup } from './entities';

export enum QuestionGroupsActionTypes {
  LOAD = '[QuestionGroups] Load',
  LOAD_SUCCESS = '[QuestionGroups] Load Success',
  LOAD_ERROR = '[QuestionGroups] Load Error',
  CREATE = '[QuestionGroups] Create',
  CREATE_SUCCESS = '[QuestionGroups] Create Success',
  CREATE_ERROR = '[QuestionGroups] Create Error',
  EDIT = '[QuestionGroups] Edit',
  EDIT_SUCCESS = '[QuestionGroups] Edit Success',
  EDIT_ERROR = '[QuestionGroups] Edit Error',
  DELETE = '[QuestionGroups] Delete',
  DELETE_SUCCESS = '[QuestionGroups] Delete Success',
  DELETE_ERROR = '[QuestionGroups] Delete Error'
}

export const load = createAction(QuestionGroupsActionTypes.LOAD);
export const loadSuccess = createAction(
  QuestionGroupsActionTypes.LOAD_SUCCESS,
  props<{ questionGroups: Array<QuestionGroup> }>()
);
export const loadError = createAction(QuestionGroupsActionTypes.LOAD_ERROR);
export const create = createAction(QuestionGroupsActionTypes.CREATE, props<{ name: string }>());
export const createSuccess = createAction(
  QuestionGroupsActionTypes.CREATE_SUCCESS,
  props<{ questionGroup: QuestionGroup }>()
);
export const createError = createAction(QuestionGroupsActionTypes.CREATE_ERROR);
export const edit = createAction(QuestionGroupsActionTypes.EDIT, props<{ questionGroup: QuestionGroup }>());
export const editSuccess = createAction(
  QuestionGroupsActionTypes.EDIT_SUCCESS,
  props<{ questionGroup: QuestionGroup }>()
);
export const editError = createAction(QuestionGroupsActionTypes.EDIT_ERROR);
export const deleteQuestionGroup = createAction(QuestionGroupsActionTypes.DELETE, props<{ questionGroupId: number }>());
export const deleteQuestionGroupSuccess = createAction(
  QuestionGroupsActionTypes.DELETE_SUCCESS,
  props<{ questionGroupId: number }>()
);
export const deleteQuestionGroupError = createAction(QuestionGroupsActionTypes.DELETE_ERROR);
