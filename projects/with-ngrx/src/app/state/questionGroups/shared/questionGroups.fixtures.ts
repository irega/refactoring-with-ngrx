import { QuestionGroup } from '../entities';

export class Given {
  private questionGroup: QuestionGroup;

  static a_question_group(): QuestionGroup {
    return {
      id: 1,
      name: 'A question group'
    };
  }

  a_question_group(): Given {
    this.questionGroup = Given.a_question_group();
    return this;
  }

  withId(id: number): Given {
    this.questionGroup.id = id;
    return this;
  }

  withName(name: string): Given {
    this.questionGroup.name = name;
    return this;
  }

  build(): QuestionGroup {
    return this.questionGroup;
  }
}
