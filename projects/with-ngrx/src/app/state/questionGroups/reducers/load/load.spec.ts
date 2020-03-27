import { LOAD, LOAD_ERROR } from './load';
import { QuestionGroup } from '../../entities';
import { Given } from '../../shared/questionGroups.fixtures';

const a_question_group_list: QuestionGroup[] = [Given.a_question_group()];

describe('The load question groups action', () => {
  it('should return the same question groups', () => {
    const question_groups = LOAD(a_question_group_list);

    expect(question_groups).toEqual(a_question_group_list);
  });
});

describe('The load question groups error action', () => {
  it('should return the same question groups', () => {
    const question_groups = LOAD_ERROR(a_question_group_list);

    expect(question_groups).toEqual(a_question_group_list);
  });
});
