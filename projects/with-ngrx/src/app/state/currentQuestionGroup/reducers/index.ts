import { createReducer, on } from '@ngrx/store';
import { LOAD } from './load';
import { load } from '../actions';
import { CurrentQuestionGroup } from '../entities';

const EMPTY_CURRENT_QUESTION_GROUP: CurrentQuestionGroup = {
  id: 0,
  name: ''
};
const initialState = EMPTY_CURRENT_QUESTION_GROUP;

const _currentQuestionGroupReducer = createReducer(initialState, on(load, LOAD));

export function currentQuestionGroupReducer(state, action) {
  return _currentQuestionGroupReducer(state, action);
}
