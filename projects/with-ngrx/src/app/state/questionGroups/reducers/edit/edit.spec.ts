import { QuestionGroup } from '../../entities';
import { Given } from '../../shared/questionGroups.fixtures';
import { EDIT, EDIT_ERROR, EDIT_SUCCESS } from './edit';

describe('The edit question group action', () => {
  it('should return the same question groups', () => {
    const a_question_group_list: QuestionGroup[] = [Given.a_question_group()];

    const question_groups = EDIT(a_question_group_list);

    expect(question_groups).toEqual(a_question_group_list);
  });
});

describe('The edit question group success action', () => {
  it('should edit a question group', () => {
    const a_question_group_id = 1;
    const a_question_group_to_edit = new Given()
      .a_question_group()
      .withId(a_question_group_id)
      .withName('A question group')
      .build();
    const a_question_group_list: QuestionGroup[] = [a_question_group_to_edit];
    const an_edited_question_group = new Given()
      .a_question_group()
      .withId(a_question_group_id)
      .withName('New name')
      .build();

    const question_groups = EDIT_SUCCESS(a_question_group_list, { questionGroup: an_edited_question_group });

    const edited_question_group: QuestionGroup = question_groups.find(qg => (qg.id = a_question_group_to_edit.id));
    expect(edited_question_group.name).toEqual(an_edited_question_group.name);
  });
});

describe('The edit question group error action', () => {
  it('should return the same question groups', () => {
    const a_question_group_list: QuestionGroup[] = [Given.a_question_group()];

    const question_groups = EDIT_ERROR(a_question_group_list);

    expect(question_groups).toEqual(a_question_group_list);
  });
});
