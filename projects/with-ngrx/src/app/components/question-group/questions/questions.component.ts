import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/definition';
import { Observable } from 'rxjs';
import { Question } from 'src/app/state/questions/entities';
import { selectQuestions } from 'src/app/state/questions/selectors';
import { QuestionsActionTypes } from 'src/app/state/questions/actions';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html'
})
export class QuestionsComponent {
  questionToAddText = '';
  questions$: Observable<Question[]> = this.store.select(selectQuestions);

  constructor(private store: Store<State>) {}

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
}
