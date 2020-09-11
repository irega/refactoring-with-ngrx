import { Answer } from '../../entities';
import { Given } from '../../shared/answers.fixtures';
import { EDIT, EDIT_ERROR, EDIT_SUCCESS } from './edit';

describe('The edit answer action', () => {
  it('should return the same answers', () => {
    const an_answer_list: Answer[] = [Given.an_answer()];

    const answers = EDIT(an_answer_list);

    expect(answers).toEqual(an_answer_list);
  });
});

describe('The edit answer success action', () => {
  it('should edit a answer', () => {
    const an_answer_id = 1;
    const an_answer_to_edit = new Given()
      .an_answer()
      .withId(an_answer_id)
      .withText('An answer')
      .build();
    const an_answer_list: Answer[] = [an_answer_to_edit];
    const an_edited_answer = new Given()
      .an_answer()
      .withId(an_answer_id)
      .withText('New name')
      .build();

    const answers = EDIT_SUCCESS(an_answer_list, { payload: { answer: an_edited_answer } });

    const edited_answer: Answer = answers.find(q => (q.id = an_answer_to_edit.id));
    expect(edited_answer.text).toEqual(an_edited_answer.text);
  });
});

describe('The edit answer error action', () => {
  it('should return the same answers', () => {
    const an_answer_list: Answer[] = [Given.an_answer()];

    const answers = EDIT_ERROR(an_answer_list);

    expect(answers).toEqual(an_answer_list);
  });
});
