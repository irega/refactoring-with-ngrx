import { Question } from '../../entities';

export function DELETE(state: Question[]): Question[] {
  return [...state];
}

export function DELETE_SUCCESS(state: Question[], action: { payload: { questionId: number } }): Question[] {
  const newState = [...state];
  const deletedQuestionIndex = newState.findIndex(d => d.id === action.payload.questionId);
  newState.splice(deletedQuestionIndex, 1);
  return newState;
}

export function DELETE_ERROR(state: Question[]): Question[] {
  return [...state];
}
