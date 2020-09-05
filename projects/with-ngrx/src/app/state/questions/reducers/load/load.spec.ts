import { Question } from '../../entities';
import { Given } from '../../shared/questions.fixtures';
import { LOAD } from './load';

describe('The load question action', () => {
  it('should load a new question list', () => {
    const a_question = new Given()
      .a_question()
      .withText('A question')
      .build();
    const a_question_list: Question[] = [a_question];
    const another_question = new Given()
      .a_question()
      .withId(a_question.id + 1)
      .withText('Another question')
      .build();
    const a_new_question_list: Question[] = [another_question];

    const questions = LOAD(a_question_list, { payload: { questions: a_new_question_list } });

    expect(questions).toEqual(a_new_question_list);
  });
});
