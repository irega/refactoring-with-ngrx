import { Answer } from '../../entities';
import { Given } from '../../shared/answers.fixtures';
import { CREATE, CREATE_ERROR, CREATE_SUCCESS } from './create';

describe('The create answer action', () => {
  it('should return the same answers', () => {
    const an_answer_list: Answer[] = [Given.an_answer()];

    const answers = CREATE(an_answer_list);

    expect(answers).toEqual(an_answer_list);
  });
});

describe('The create answer success action', () => {
  it('should create the selected answer', () => {
    const an_answer = new Given()
      .an_answer()
      .withText('An answer')
      .build();
    const an_answer_list: Answer[] = [an_answer];
    const an_answer_to_create = new Given()
      .an_answer()
      .withId(an_answer.id + 1)
      .withText('Another answer')
      .build();

    const answers = CREATE_SUCCESS(an_answer_list, { payload: { answer: an_answer_to_create } });

    const created_answer = answers.find(q => q.id === an_answer_to_create.id);
    expect(created_answer).toEqual(an_answer_to_create);
  });
});

describe('The create answer error action', () => {
  it('should return the same answers', () => {
    const an_answer_list: Answer[] = [Given.an_answer()];

    const answers = CREATE_ERROR(an_answer_list);

    expect(answers).toEqual(an_answer_list);
  });
});
