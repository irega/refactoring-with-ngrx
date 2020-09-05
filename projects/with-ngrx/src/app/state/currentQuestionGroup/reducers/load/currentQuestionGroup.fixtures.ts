import { CurrentQuestionGroup } from '../../entities';

export class Given {
  private currentQuestionGroup: CurrentQuestionGroup;

  static a_current_question_group(): CurrentQuestionGroup {
    return {
      id: 1,
      name: 'A question group'
    };
  }

  a_question_group(): Given {
    this.currentQuestionGroup = Given.a_current_question_group();
    return this;
  }

  withId(id: number): Given {
    this.currentQuestionGroup.id = id;
    return this;
  }

  withName(name: string): Given {
    this.currentQuestionGroup.name = name;
    return this;
  }

  build(): CurrentQuestionGroup {
    return this.currentQuestionGroup;
  }
}
