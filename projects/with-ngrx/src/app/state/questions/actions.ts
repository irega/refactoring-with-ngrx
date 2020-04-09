import { createAction, props } from '@ngrx/store';
import { Question } from './entities';

export enum QuestionsActionTypes {
  LOAD = '[Questions] Load'
}

export const load = createAction(QuestionsActionTypes.LOAD, props<{ payload: { questions: Question[] } }>());
