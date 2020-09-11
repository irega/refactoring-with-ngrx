import { Answer } from '../../entities';
import { Given } from '../../shared/answers.fixtures';
import { DELETE, DELETE_ERROR, DELETE_SUCCESS } from './delete';

describe('The delete answer action', () => {
  it('should return the same answers', () => {
    const an_answer_list: Answer[] = [Given.an_answer()];

    const answers = DELETE(an_answer_list);

    expect(answers).toEqual(an_answer_list);
  });
});

describe('The delete answer success action', () => {
  it('should delete the selected answer', () => {
    const an_answer_list: Answer[] = [Given.an_answer()];
    const an_answer_to_delete = Given.an_answer();

    const answers = DELETE_SUCCESS(an_answer_list, { payload: { answerId: an_answer_to_delete.id } });

    const deleted_answer = answers.find(d => (d ? d.id === an_answer_to_delete.id : false));
    expect(deleted_answer).toEqual(undefined);
  });
});

describe('The delete answer error action', () => {
  it('should return the same answers', () => {
    const an_answer_list: Answer[] = [Given.an_answer()];

    const answers = DELETE_ERROR(an_answer_list);

    expect(answers).toEqual(an_answer_list);
  });
});
