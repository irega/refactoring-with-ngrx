import { Question } from '../../entities';
import { Given } from '../../shared/questions.fixtures';
import { CREATE, CREATE_ERROR, CREATE_SUCCESS } from './create';

describe('The create question action', () => {
  it('should return the same questions', () => {
    const a_question_list: Question[] = [Given.a_question()];

    const questions = CREATE(a_question_list);

    expect(questions).toEqual(a_question_list);
  });
});

describe('The create question success action', () => {
  it('should create the selected question', () => {
    const a_question = new Given()
      .a_question()
      .withText('A question')
      .build();
    const a_question_list: Question[] = [a_question];
    const a_question_to_create = new Given()
      .a_question()
      .withId(a_question.id + 1)
      .withText('Another question')
      .build();

    const questions = CREATE_SUCCESS(a_question_list, { payload: { question: a_question_to_create } });

    const created_question = questions.find(q => q.id === a_question_to_create.id);
    expect(created_question).toEqual(a_question_to_create);
  });
});

describe('The create question error action', () => {
  it('should return the same questions', () => {
    const a_question_list: Question[] = [Given.a_question()];

    const questions = CREATE_ERROR(a_question_list);

    expect(questions).toEqual(a_question_list);
  });
});
