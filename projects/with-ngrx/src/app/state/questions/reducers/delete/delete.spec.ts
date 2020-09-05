import { Question } from '../../entities';
import { Given } from '../../shared/questions.fixtures';
import { DELETE, DELETE_ERROR, DELETE_SUCCESS } from './delete';

describe('The delete question action', () => {
  it('should return the same questions', () => {
    const a_question_list: Question[] = [Given.a_question()];

    const questions = DELETE(a_question_list);

    expect(questions).toEqual(a_question_list);
  });
});

describe('The delete question success action', () => {
  it('should delete the selected question', () => {
    const a_question_list: Question[] = [Given.a_question()];
    const a_question_to_delete = Given.a_question();

    const questions = DELETE_SUCCESS(a_question_list, { payload: { questionId: a_question_to_delete.id } });

    const deleted_question = questions.find(d => (d ? d.id === a_question_to_delete.id : false));
    expect(deleted_question).toEqual(undefined);
  });
});

describe('The delete question error action', () => {
  it('should return the same questions', () => {
    const a_question_list: Question[] = [Given.a_question()];

    const questions = DELETE_ERROR(a_question_list);

    expect(questions).toEqual(a_question_list);
  });
});
