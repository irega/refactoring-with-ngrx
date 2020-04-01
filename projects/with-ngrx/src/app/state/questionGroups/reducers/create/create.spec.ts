import { QuestionGroup } from '../../entities';
import { CREATE, CREATE_SUCCESS, CREATE_ERROR } from './create';
import { Given } from '../../shared/questionGroups.fixtures';

const a_question_group_list: QuestionGroup[] = [Given.a_question_group()];

describe('The create question group action', () => {
  it('should return the same question groups', () => {
    const question_groups = CREATE(a_question_group_list);

    expect(question_groups).toEqual(a_question_group_list);
  });
});

describe('The create question group success action', () => {
  it('should create the selected question group', () => {
    const a_question_group_to_create = Given.a_question_group();

    const question_groups = CREATE_SUCCESS(a_question_group_list, { questionGroup: a_question_group_to_create });

    const created_question_group = question_groups.find(d => (d ? d.id === a_question_group_to_create.id : false));
    expect(created_question_group).toEqual(a_question_group_to_create);
  });
});

describe('The create question group error action', () => {
  it('should return the same question groups', () => {
    const question_groups = CREATE_ERROR(a_question_group_list);

    expect(question_groups).toEqual(a_question_group_list);
  });
});
