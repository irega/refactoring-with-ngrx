import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';
import { AnswersActionTypes } from 'src/app/state/answers/actions';
import { Answer } from 'src/app/state/answers/entities';
import { selectAnswers } from 'src/app/state/answers/selectors';
import { State } from 'src/app/state/definition';
import { QuestionsActionTypes } from 'src/app/state/questions/actions';
import { Question } from 'src/app/state/questions/entities';
import { selectQuestions } from 'src/app/state/questions/selectors';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsComponent implements OnInit, OnDestroy {
  questionToAddText = '';
  questions$: Observable<Question[]> = this.store.select(selectQuestions);
  answers$: Observable<Answer[]> = this.store.select(selectAnswers);
  answers: Answer[];

  private answersSubscription: Subscription;

  constructor(private store: Store<State>, private customModalService: CustomModalService) {}

  ngOnInit() {
    this.answersSubscription = this.answers$.subscribe(answers => (this.answers = answers));
  }

  ngOnDestroy() {
    this.answersSubscription.unsubscribe();
  }

  updateQuestion(keyCode: number, question: Question, text: string): void {
    if (keyCode !== 13) {
      return;
    }
    const questionToUpdate = Object.assign({}, question, { text });
    this.store.dispatch({ type: QuestionsActionTypes.EDIT, payload: { question: questionToUpdate } });
  }

  addQuestion(keyCode: number): void {
    if (keyCode !== 13) {
      return;
    }
    this.store.dispatch({ type: QuestionsActionTypes.CREATE, payload: { text: this.questionToAddText } });
    this.questionToAddText = '';
  }

  deleteQuestion(questionId: number): void {
    this.customModalService.show({
      title: 'Delete a question',
      description: 'Are you sure you want to delete this question?',
      ok: { text: 'Yes' },
      cancel: { text: 'No' }
    });
    const subscription = this.customModalService.stateChange.subscribe(params => {
      subscription.unsubscribe();
      if (params.confirmed) {
        this.store.dispatch({ type: QuestionsActionTypes.DELETE, payload: { questionId } });
      }
    });
  }

  toggleQuestion(questionId: number) {
    this.store.dispatch({ type: QuestionsActionTypes.TOGGLE, payload: { questionId } });
  }

  addAnswer(answer: Answer) {
    this.store.dispatch({ type: AnswersActionTypes.CREATE, payload: { answer } });
  }

  editAnswer(answer: Answer) {
    this.store.dispatch({ type: AnswersActionTypes.EDIT, payload: { answer } });
  }

  deleteAnswer(answerId: number): void {
    this.store.dispatch({ type: AnswersActionTypes.DELETE, payload: { answerId } });
  }
}
