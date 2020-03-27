import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { QuestionGroupsActionTypes } from 'src/app/state/questionGroups/actions';
import { selectQuestionGroups } from 'src/app/state/questionGroups/selectors';
import { QuestionGroup } from 'src/app/state/questionGroups/entities';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/definition';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  questionGroups$: Observable<QuestionGroup[]> = this.store.select(selectQuestionGroups);

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch({ type: QuestionGroupsActionTypes.LOAD });
  }
}
