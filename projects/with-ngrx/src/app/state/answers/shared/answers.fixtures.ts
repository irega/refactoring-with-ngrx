import { Answer } from '../entities';

export class Given {
  private answer: Answer;

  static an_answer(): Answer {
    return {
      id: 1,
      questionGroupId: 1,
      questionId: 1,
      text: 'A question'
    };
  }

  an_answer(): Given {
    this.answer = Given.an_answer();
    return this;
  }

  withId(id: number): Given {
    this.answer.id = id;
    return this;
  }

  withText(text: string): Given {
    this.answer.text = text;
    return this;
  }

  build(): Question {
    return this.answer;
  }
}
