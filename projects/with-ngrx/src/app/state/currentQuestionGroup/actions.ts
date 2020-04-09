import { createAction, props } from '@ngrx/store';
import { QuestionGroup } from '../questionGroups/entities';

export enum CurrentQuestionGroupActionTypes {
  LOAD = '[CurrentQuestionGroup] Load'
}

export const load = createAction(
  CurrentQuestionGroupActionTypes.LOAD,
  props<{ payload: { questionGroup: QuestionGroup } }>()
);
