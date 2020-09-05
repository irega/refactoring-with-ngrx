import { Given } from './currentQuestionGroup.fixtures';
import { LOAD } from './load';

describe('The load current question group action', () => {
  it('should load a new current question group', () => {
    const a_current_question_group = new Given()
      .a_question_group()
      .withName('A question group')
      .build();
    const another_current_question_group = new Given()
      .a_question_group()
      .withId(a_current_question_group.id + 1)
      .withName('Another question group')
      .build();

    const current_question_group = LOAD(a_current_question_group, {
      payload: { questionGroup: another_current_question_group }
    });

    expect(current_question_group).toEqual(another_current_question_group);
  });
});
