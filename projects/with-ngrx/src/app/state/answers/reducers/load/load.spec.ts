import { Answer } from '../../entities';
import { Given } from '../../shared/answers.fixtures';
import { LOAD } from './load';

describe('The load answer action', () => {
  it('should load a new answer list', () => {
    const an_answer = new Given()
      .an_answer()
      .withText('An answer')
      .build();
    const an_answer_list: Answer[] = [an_answer];
    const another_answer = new Given()
      .an_answer()
      .withId(an_answer.id + 1)
      .withText('Another answer')
      .build();
    const a_new_answer_list: Answer[] = [another_answer];

    const answers = LOAD(an_answer_list, { payload: { answers: a_new_answer_list } });

    expect(answers).toEqual(a_new_answer_list);
  });
});
