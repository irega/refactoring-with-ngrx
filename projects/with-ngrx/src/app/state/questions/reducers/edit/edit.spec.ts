import { Question } from '../../entities';
import { Given } from '../../shared/questions.fixtures';
import { EDIT, EDIT_ERROR, EDIT_SUCCESS } from './edit';

describe('The edit question action', () => {
  it('should return the same questions', () => {
    const a_question_list: Question[] = [Given.a_question()];

    const questions = EDIT(a_question_list);

    expect(questions).toEqual(a_question_list);
  });
});

describe('The edit question success action', () => {
  it('should edit a question', () => {
    const a_question_id = 1;
    const a_question_to_edit = new Given()
      .a_question()
      .withId(a_question_id)
      .withText('A question')
      .build();
    const a_question_list: Question[] = [a_question_to_edit];
    const an_edited_question = new Given()
      .a_question()
      .withId(a_question_id)
      .withText('New name')
      .build();

    const questions = EDIT_SUCCESS(a_question_list, { payload: { question: an_edited_question } });

    const edited_question: Question = questions.find(q => (q.id = a_question_to_edit.id));
    expect(edited_question.text).toEqual(an_edited_question.text);
  });
});

describe('The edit question error action', () => {
  it('should return the same questions', () => {
    const a_question_list: Question[] = [Given.a_question()];

    const questions = EDIT_ERROR(a_question_list);

    expect(questions).toEqual(a_question_list);
  });
});
