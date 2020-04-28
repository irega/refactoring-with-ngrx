import { Answer } from '../entities';

export function DELETE(state): Answer[] {
  return [...state];
}

export function DELETE_SUCCESS(state: Answer[], action: { payload: { answerId: number } }): Answer[] {
  const newState = [...state];
  const deletedAnswerIndex = newState.findIndex(d => d.id === action.payload.answerId);
  newState.splice(deletedAnswerIndex, 1);
  return newState;
}

export function DELETE_ERROR(state): Answer[] {
  return [...state];
}
