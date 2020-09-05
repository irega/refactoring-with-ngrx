import { Question } from '../../entities';

export function TOGGLE(state: Question[]): Question[] {
  return [...state];
}

export function TOGGLE_SUCCESS(state: Question[], action: { payload: { questionId: number } }): Question[] {
  const newState = closeOtherQuestions([...state], action.payload.questionId);
  const questionToOpenIndex = newState.findIndex(q => q.id === action.payload.questionId);
  const questionToOpen = newState[questionToOpenIndex];
  const questionOpened = {
    ...questionToOpen,
    isOpened: !questionToOpen.isOpened
  };
  newState[questionToOpenIndex] = questionOpened;
  return newState;
}

function closeOtherQuestions(questions: Question[], questionId: number): Question[] {
  return questions.map(q => {
    if (q.id === questionId) {
      return { ...q };
    }
    return { ...q, isOpened: false };
  });
}

export function TOGGLE_ERROR(state: Question[]): Question[] {
  return [...state];
}
