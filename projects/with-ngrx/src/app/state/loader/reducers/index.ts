import { createReducer, on } from '@ngrx/store';
import { activate, deactivate } from '../actions';
import { Loader } from '../entities';
import { ACTIVATE } from './activate/activate';
import { DEACTIVATE } from './deactivate/deactivate';

const initialState: Loader = { isActive: false, pendingRequests: 0 };

const _loaderReducer = createReducer(initialState, on(activate, ACTIVATE), on(deactivate, DEACTIVATE));

export function loaderReducer(state, action) {
  return _loaderReducer(state, action);
}
