import { createAction, props } from '@ngrx/store';
import { Answer } from './entities';

export enum AnswersActionTypes {
  LOAD = '[Answers] Load'
}

export const load = createAction(AnswersActionTypes.LOAD, props<{ payload: { answers: Answer[] } }>());
