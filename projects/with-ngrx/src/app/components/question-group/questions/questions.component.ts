import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/definition';
import { Observable } from 'rxjs';
import { Question } from 'src/app/state/questions/entities';
import { selectQuestions } from 'src/app/state/questions/selectors';
import { QuestionsActionTypes } from 'src/app/state/questions/actions';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html'
})
export class QuestionsComponent {
  questionToAddText = '';
  questions$: Observable<Question[]> = this.store.select(selectQuestions);

  constructor(private store: Store<State>, private customModalService: CustomModalService) {}

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
}
