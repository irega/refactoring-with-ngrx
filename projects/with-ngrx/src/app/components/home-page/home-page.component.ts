import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';
import { State } from 'src/app/state/definition';
import { QuestionGroupsActionTypes } from 'src/app/state/questionGroups/actions';
import { QuestionGroup } from 'src/app/state/questionGroups/entities';
import { selectQuestionGroups } from 'src/app/state/questionGroups/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
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
      title: 'Create new question group',
      description: 'Choose a name for the new question group',
      createEdit: true,
      labelInputText: { text: 'Name' },
      ok: { text: 'Create' },
      cancel: { text: 'Cancel' }
    });
    const subscription = this.customModalService.stateChange.subscribe(({ confirmed, title }) => {
      subscription.unsubscribe();
      if (!confirmed) {
        return;
      }
      this.store.dispatch({ type: QuestionGroupsActionTypes.CREATE, payload: { id: null, name: title } });
    });
  }

  editQuestionGroup(questionGroup: any) {
    this.store.dispatch({ type: QuestionGroupsActionTypes.EDIT, payload: { questionGroup } });
  }

  deleteQuestionGroup(questionGroupId: number) {
    this.store.dispatch({ type: QuestionGroupsActionTypes.DELETE, payload: { questionGroupId } });
  }
}
