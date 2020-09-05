import { Question } from '../../entities';
import { Given } from '../../shared/questions.fixtures';
import { TOGGLE, TOGGLE_ERROR, TOGGLE_SUCCESS } from './toggle';

describe('The toggle question action', () => {
  it('should return the same questions', () => {
    const a_question_list: Question[] = [new Given().a_question().build()];

    const questions = TOGGLE(a_question_list);

    expect(questions).toEqual(a_question_list);
  });
});

describe('The toggle question success action', () => {
  it("should open the current question if it's closed", () => {
    const a_closed_question = new Given()
      .a_question()
      .closed()
      .build();
    const another_question = new Given()
      .a_question()
      .withId(a_closed_question.id + 1)
      .build();
    const a_question_list: Question[] = [another_question, a_closed_question];

    const questions = TOGGLE_SUCCESS(a_question_list, {
      payload: { questionId: a_closed_question.id }
    });

    const opened_question = questions.find(q => q.id === a_closed_question.id);
    expect(opened_question.isOpened).toBeTruthy();
  });

  it("should close the current question if it's opened", () => {
    const an_opened_question = new Given()
      .a_question()
      .opened()
      .build();
    const another_question = new Given()
      .a_question()
      .withId(an_opened_question.id + 1)
      .build();
    const a_question_list: Question[] = [another_question, an_opened_question];

    const questions = TOGGLE_SUCCESS(a_question_list, {
      payload: { questionId: an_opened_question.id }
    });

    const opened_question = questions.find(q => q.id === an_opened_question.id);
    expect(opened_question.isOpened).toBeFalsy();
  });

  it('should close the other questions', () => {
    const an_opened_question = new Given()
      .a_question()
      .opened()
      .build();
    const a_closed_question = new Given()
      .a_question()
      .withId(an_opened_question.id + 1)
      .closed()
      .build();
    const a_question_list: Question[] = [a_closed_question, an_opened_question];

    const questions = TOGGLE_SUCCESS(a_question_list, {
      payload: { questionId: a_closed_question.id }
    });

    const opened_question = questions.find(q => q.id === an_opened_question.id);
    expect(opened_question.isOpened).toBeFalsy();
  });
});

describe('The toggle question error action', () => {
  it('should return the same questions', () => {
    const a_question_list: Question[] = [new Given().a_question().build()];

    const questions = TOGGLE_ERROR(a_question_list);

    expect(questions).toEqual(a_question_list);
  });
});
