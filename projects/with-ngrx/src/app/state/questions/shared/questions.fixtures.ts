import { Question } from '../entities';

export class Given {
  private question: Question;

  static a_question(): Question {
    return {
      id: 1,
      questionGroupId: 1,
      text: 'A question',
      isOpened: false
    };
  }

  a_question(): Given {
    this.question = Given.a_question();
    return this;
  }

  withId(id: number): Given {
    this.question.id = id;
    return this;
  }

  withText(text: string): Given {
    this.question.text = text;
    return this;
  }

  opened(): Given {
    this.question.isOpened = true;
    return this;
  }

  closed(): Given {
    this.question.isOpened = false;
    return this;
  }

  build(): Question {
    return this.question;
  }
}
