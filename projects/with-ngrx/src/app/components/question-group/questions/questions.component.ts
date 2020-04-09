import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/definition';
import { Observable } from 'rxjs';
import { Question } from 'src/app/state/questions/entities';
import { selectQuestions } from 'src/app/state/questions/selectors';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html'
})
export class QuestionsComponent {
  questionToAddText = '';
  questions$: Observable<Question[]> = this.store.select(selectQuestions);

  constructor(private store: Store<State>) {}
}
