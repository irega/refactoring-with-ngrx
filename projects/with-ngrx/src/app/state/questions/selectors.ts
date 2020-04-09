import { State } from '../definition';
import { createSelector } from '@ngrx/store';
import { selectState } from '../selectors';

export const selectQuestions = createSelector(selectState, (state: State) => state.questions);
