import { createAction, props } from '@ngrx/store';
import { QuestionGroup } from './entities';

export enum QuestionGroupsActionTypes {
  LOAD = '[QuestionGroups] Load',
  LOAD_SUCCESS = '[QuestionGroups] Load Success',
  LOAD_ERROR = '[QuestionGroups] Load Error'
}

export const load = createAction(QuestionGroupsActionTypes.LOAD);
export const loadSuccess = createAction(
  QuestionGroupsActionTypes.LOAD_SUCCESS,
  props<{ questionGroups: Array<QuestionGroup> }>()
);
export const loadError = createAction(QuestionGroupsActionTypes.LOAD_ERROR);
