import { Answer } from '../../entities';

export function CREATE(state: Answer[]): Answer[] {
  return [...state];
}

export function CREATE_SUCCESS(state: Answer[], action: { payload: { answer: Answer } }): Answer[] {
  const newState = [...state];
  newState.push(action.payload.answer);
  return newState;
}

export function CREATE_ERROR(state: Answer[]): Answer[] {
  return [...state];
}
