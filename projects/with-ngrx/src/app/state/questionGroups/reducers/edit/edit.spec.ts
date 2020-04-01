import { EDIT, EDIT_SUCCESS, EDIT_ERROR } from './edit';
import { QuestionGroup } from '../../entities';
import { Given } from '../../shared/questionGroups.fixtures';

const a_question_group_list: QuestionGroup[] = [Given.a_question_group()];

describe('The edit question group action', () => {
  it('should return the same question groups', () => {
    const question_groups = EDIT(a_question_group_list);

    expect(question_groups).toEqual(a_question_group_list);
  });
});

describe('The edit question group success action', () => {
  it('should edit a question group and return the list with the edited question group', () => {
    const a_question_group_to_edit = Given.a_question_group();
    const an_edited_question_group: QuestionGroup = a_question_group_to_edit;
    an_edited_question_group.name = 'New name';

    const question_groups: QuestionGroup[] = EDIT_SUCCESS(a_question_group_list, {
      questionGroup: an_edited_question_group
    });

    const edited_question_group: QuestionGroup = question_groups.find(d => (d.id = a_question_group_to_edit.id));
    expect(edited_question_group.name).toEqual(a_question_group_to_edit.name);
  });
});

describe('The edit question group error action', () => {
  it('should return the same question groups', () => {
    const question_groups = EDIT_ERROR(a_question_group_list);

    expect(question_groups).toEqual(a_question_group_list);
  });
});
