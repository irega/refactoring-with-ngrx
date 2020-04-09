import { State } from '../definition';
import { createSelector } from '@ngrx/store';
import { selectState } from '../selectors';

export const selectCurrentQuestionGroup = createSelector(selectState, (state: State) => state.currentQuestionGroup);
