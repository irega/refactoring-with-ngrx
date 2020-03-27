import { State } from '../definition';
import { createSelector } from '@ngrx/store';
import { selectState } from '../selectors';

export const selectQuestionGroups = createSelector(selectState, (state: State) => state.questionGroups);
