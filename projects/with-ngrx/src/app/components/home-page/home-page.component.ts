import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { QuestionGroupsActionTypes } from 'src/app/state/questionGroups/actions';
import { selectQuestionGroups } from 'src/app/state/questionGroups/selectors';
import { QuestionGroup } from 'src/app/state/questionGroups/entities';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/definition';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  questionGroups$: Observable<QuestionGroup[]> = this.store.select(selectQuestionGroups);

  constructor(private store: Store<State>, private customModalService: CustomModalService) {}

  ngOnInit() {
    this.store.dispatch({ type: QuestionGroupsActionTypes.LOAD });
  }

  openModalCreateQuestionGroup() {
    this.customModalService.show({
      title: 'title',
      description: 'description',
      descriptionSmall: true,
      createEdit: true,
      labelInputText: { text: 'label' },
      ok: { text: 'ok' },
      cancel: { text: 'cancel' }
    });
    const subscription = this.customModalService.stateChange.subscribe(({ confirmed }) => {
      subscription.unsubscribe();
      if (!confirmed) {
        return;
      }
      // this.store.dispatch({ type: QuestionGroupsActionTypes.CREATE, payload: { name: title } });
    });
  }

  editQuestionGroup() {
    // this.store.dispatch({ type: QuestionGroupsActionTypes.EDIT, payload: { questionGroup } });
  }

  deleteQuestionGroup() {
    // this.store.dispatch({ type: QuestionGroupsActionTypes.DELETE, payload: { questionGroupId } });
  }
}
