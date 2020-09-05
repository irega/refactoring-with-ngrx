import { QuestionGroup } from '../../entities';
import { Given } from '../../shared/questionGroups.fixtures';
import { LOAD, LOAD_ERROR, LOAD_SUCCESS } from './load';

describe('The load question groups action', () => {
  it('should return the same question groups', () => {
    const a_question_group_list: QuestionGroup[] = [Given.a_question_group()];

    const question_groups = LOAD(a_question_group_list);

    expect(question_groups).toEqual(a_question_group_list);
  });
});

describe('The load question groups success action', () => {
  it('should load a new question group list', () => {
    const a_question_group = new Given()
      .a_question_group()
      .withName('A question group')
      .build();
    const a_question_group_list: QuestionGroup[] = [a_question_group];
    const another_question_group = new Given()
      .a_question_group()
      .withId(a_question_group.id + 1)
      .withName('Another question group')
      .build();
    const a_new_question_group_list: QuestionGroup[] = [another_question_group];

    const question_groups = LOAD_SUCCESS(a_question_group_list, { questionGroups: a_new_question_group_list });

    expect(question_groups).toEqual(a_new_question_group_list);
  });
});

describe('The load question groups error action', () => {
  it('should return the same question groups', () => {
    const a_question_group_list: QuestionGroup[] = [Given.a_question_group()];

    const question_groups = LOAD_ERROR(a_question_group_list);

    expect(question_groups).toEqual(a_question_group_list);
  });
});
