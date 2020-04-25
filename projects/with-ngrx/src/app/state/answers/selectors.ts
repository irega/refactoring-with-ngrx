import { State } from '../definition';
import { createSelector } from '@ngrx/store';
import { selectState } from '../selectors';

export const selectAnswers = createSelector(selectState, (state: State) => state.answers);
