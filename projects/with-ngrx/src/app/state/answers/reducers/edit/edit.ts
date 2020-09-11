import { Answer } from '../../entities';

export function EDIT(state: Answer[]): Answer[] {
  return [...state];
}

export function EDIT_SUCCESS(state, action: { payload: { answer } }): Answer[] {
  const newState = [...state];
  const updatedAnswerIndex = newState.findIndex(d => d && d.id === action.payload.answer.id);
  newState[updatedAnswerIndex] = action.payload.answer;
  return newState;
}

export function EDIT_ERROR(state: Answer[]): Answer[] {
  return [...state];
}
