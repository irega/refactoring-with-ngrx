import { QuestionGroup } from './questionGroups/entities';
import { Question } from './questions/entities';
import { CurrentQuestionGroup } from './currentQuestionGroup/entities';
import { Answer } from './answers/entities';

export interface State {
  currentQuestionGroup: CurrentQuestionGroup;
  questionGroups: QuestionGroup[];
  questions: Question[];
  answers: Answer[];
}
