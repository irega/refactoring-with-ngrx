import { State } from '../definition';
import { createSelector } from '@ngrx/store';
import { selectState } from '../selectors';
import { Question } from './entities';

export const selectQuestions = createSelector(selectState, (state: State) => state.questions);

export const selectQuestionById = createSelector(selectQuestions, (questions: Question[], props: { id: number }) => {
  return questions.find(q => q.id === props.id);
});

export const selectOpenedQuestion = createSelector(selectQuestions, (questions: Question[]) => {
  return questions.find(q => q.isOpened);
});
