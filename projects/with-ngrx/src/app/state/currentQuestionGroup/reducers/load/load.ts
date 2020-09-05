import { CurrentQuestionGroup } from '../../entities';

export function LOAD(
  _state: CurrentQuestionGroup,
  action: { payload: { questionGroup: CurrentQuestionGroup } }
): CurrentQuestionGroup {
  return { ...action.payload.questionGroup };
}
