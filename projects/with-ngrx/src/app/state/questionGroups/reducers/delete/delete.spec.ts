import { QuestionGroup } from '../../entities';
import { DELETE, DELETE_SUCCESS, DELETE_ERROR } from './delete';
import { Given } from '../../shared/questionGroups.fixtures';

const a_question_group_list: QuestionGroup[] = [Given.a_question_group()];

describe('The delete question group action', () => {
  it('should return the same question groups', () => {
    const question_groups = DELETE(a_question_group_list);

    expect(question_groups).toEqual(a_question_group_list);
  });
});

describe('The delete question group success action', () => {
  it('should delete the selected question group', () => {
    const a_question_group_to_delete = Given.a_question_group();

    const question_groups = DELETE_SUCCESS(a_question_group_list, { questionGroupId: a_question_group_to_delete.id });

    const deleted_question_group = question_groups.find(d => (d ? d.id === a_question_group_to_delete.id : false));
    expect(deleted_question_group).toEqual(undefined);
  });
});

describe('The delete question group error action', () => {
  it('should return the same question groups', () => {
    const question_groups = DELETE_ERROR(a_question_group_list);

    expect(question_groups).toEqual(a_question_group_list);
  });
});
