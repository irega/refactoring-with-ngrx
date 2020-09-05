import { QuestionGroup } from '../../entities';
import { Given } from '../../shared/questionGroups.fixtures';
import { CREATE, CREATE_ERROR, CREATE_SUCCESS } from './create';

describe('The create question group action', () => {
  it('should return the same question groups', () => {
    const a_question_group_list: QuestionGroup[] = [Given.a_question_group()];

    const question_groups = CREATE(a_question_group_list);

    expect(question_groups).toEqual(a_question_group_list);
  });
});

describe('The create question group success action', () => {
  it('should create the selected question group', () => {
    const a_question_group = new Given()
      .a_question_group()
      .withName('A question group')
      .build();
    const a_question_group_list: QuestionGroup[] = [a_question_group];
    const a_question_group_to_create = new Given()
      .a_question_group()
      .withId(a_question_group.id + 1)
      .withName('Another question group')
      .build();

    const question_groups = CREATE_SUCCESS(a_question_group_list, { questionGroup: a_question_group_to_create });

    const created_question_group = question_groups.find(qg => qg.id === a_question_group_to_create.id);
    expect(created_question_group).toEqual(a_question_group_to_create);
  });
});

describe('The create question group error action', () => {
  it('should return the same question groups', () => {
    const a_question_group_list: QuestionGroup[] = [Given.a_question_group()];

    const question_groups = CREATE_ERROR(a_question_group_list);

    expect(question_groups).toEqual(a_question_group_list);
  });
});
