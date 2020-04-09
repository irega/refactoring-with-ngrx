import { Question } from '../entities';

export function LOAD(_state: Question[], action: { payload: { questions: Question[] } }): Question[] {
  return [...action.payload.questions];
}
