import { Answer } from './answers/entities';
import { CurrentQuestionGroup } from './currentQuestionGroup/entities';
import { Loader } from './loader/entities';
import { QuestionGroup } from './questionGroups/entities';
import { Question } from './questions/entities';

export interface State {
  currentQuestionGroup: CurrentQuestionGroup;
  questionGroups: QuestionGroup[];
  questions: Question[];
  answers: Answer[];
  loader: Loader;
}
