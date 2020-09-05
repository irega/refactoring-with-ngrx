import { Question } from '../../entities';

export function CREATE(state: Question[]): Question[] {
  return [...state];
}

export function CREATE_SUCCESS(state: Question[], action: { payload: { question: Question } }): Question[] {
  const newState = [...state];
  newState.push(action.payload.question);
  return newState;
}

export function CREATE_ERROR(state: Question[]): Question[] {
  return [...state];
}
