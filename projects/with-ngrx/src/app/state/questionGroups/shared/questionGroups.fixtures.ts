import { QuestionGroup } from '../entities';

export class Given {
  static a_question_group(): QuestionGroup {
    return {
      id: 1,
      name: 'A question group'
    };
  }
}
