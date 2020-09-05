import { Question } from '../../entities';

export function EDIT(state: Question[]): Question[] {
  return [...state];
}

export function EDIT_SUCCESS(state, action: { payload: { question } }): Question[] {
  const newState = [...state];
  const updatedQuestionIndex = newState.findIndex(d => d && d.id === action.payload.question.id);
  newState[updatedQuestionIndex] = action.payload.question;
  return newState;
}

export function EDIT_ERROR(state: Question[]): Question[] {
  return [...state];
}
