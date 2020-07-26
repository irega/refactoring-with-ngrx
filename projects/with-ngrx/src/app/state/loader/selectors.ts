import { createSelector } from '@ngrx/store';
import { State } from '../definition';
import { selectState } from '../selectors';

export const selectLoader = createSelector(selectState, (state: State) => state.loader);
