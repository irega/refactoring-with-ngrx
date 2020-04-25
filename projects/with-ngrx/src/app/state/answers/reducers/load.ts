import { Answer } from '../entities';

export function LOAD(_state: Answer[], action: { payload: { answers: Answer[] } }): Answer[] {
  return [...action.payload.answers];
}
