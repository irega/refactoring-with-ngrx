import { FormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';
import { State } from 'src/app/state/definition';
import { Question } from 'src/app/state/questions/entities';
import { selectQuestions } from 'src/app/state/questions/selectors';
import { Given } from 'src/app/state/questions/shared/questions.fixtures';
import { AnswersComponent } from './answers/answers.component';
import { QuestionsComponent } from './questions.component';

const initialState: State = {
  answers: [],
  questions: [],
  questionGroups: [],
  currentQuestionGroup: { id: 0, name: '' },
  loader: { isActive: false, pendingRequests: 0 }
};

describe('The questions component', () => {
  let spectator: Spectator<QuestionsComponent>;
  let mockStore: MockStore;
  let mockQuestionsSelector: MemoizedSelector<State, Question[]>;
  const createComponent = createComponentFactory({
    component: QuestionsComponent,
    declarations: [AnswersComponent],
    imports: [FormsModule],
    providers: [CustomModalService, provideMockStore({ initialState })]
  });

  beforeEach(() => {
    spectator = createComponent();
    mockStore = spectator.inject(MockStore);
    mockQuestionsSelector = mockStore.overrideSelector(selectQuestions, []);
    spectator.detectChanges();
  });

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });

  xit('should dispatch the create question action', () => {});

  it('should emit the created question event', () => {
    const a_new_question = 'A new question';
    const new_question_input = spectator.query('.create-question-input');
    let created_question_event: { action: string; value: any };
    spectator.output<{ action: string; value: any }>('messageEventFromQuestions').subscribe(event => {
      created_question_event = event;
    });

    spectator.typeInElement(a_new_question, new_question_input);
    spectator.dispatchKeyboardEvent(new_question_input, 'keyup', 13);

    expect(created_question_event.action).toEqual('question-add');
    expect(created_question_event.value.text).toEqual(a_new_question);
  });

  xit('should dispatch the edit question action', () => {});

  it('should emit the edited question event', () => {
    const a_question = Given.a_question();
    const a_question_list = [a_question];
    let edited_question_event: { action: string; value: any };
    spectator.output<{ action: string; value: any }>('messageEventFromQuestions').subscribe(event => {
      edited_question_event = event;
    });

    mockQuestionsSelector.setResult(a_question_list);
    mockStore.refreshState();
    spectator.detectChanges();
    const an_edited_question = 'Edited question';
    let an_existing_question_input = spectator.query(`input[id="question-${a_question.id}"]`);
    spectator.typeInElement(an_edited_question, an_existing_question_input);
    spectator.dispatchFakeEvent(an_existing_question_input, 'focusout');

    expect(edited_question_event.action).toEqual('question-update');
    expect(edited_question_event.value.question.text).toEqual(an_edited_question);
  });

  xit('should dispatch the delete question action', () => {});

  it('should emit the deleted question event', () => {
    const a_question = Given.a_question();
    const a_question_list = [a_question];
    let deleted_question_event: { action: string; value: any };
    spectator.output<{ action: string; value: any }>('messageEventFromQuestions').subscribe(event => {
      deleted_question_event = event;
    });

    mockQuestionsSelector.setResult(a_question_list);
    mockStore.refreshState();
    spectator.detectChanges();
    let an_existing_question_delete_button = spectator.query(`button[id="delete-question-${a_question.id}"]`);
    spectator.click(an_existing_question_delete_button);
    const custom_modal_service = spectator.inject<CustomModalService>(CustomModalService);
    custom_modal_service.stateChange.emit({ confirmed: true });

    expect(deleted_question_event.action).toEqual('question-delete');
    expect(deleted_question_event.value.questionId).toEqual(a_question.id);
  });

  xit('should dispatch the toggle question action', () => {});

  it('should emit the toggled question event', () => {
    const a_question = Given.a_question();
    const a_question_list = [a_question];
    let toggled_question_event: { action: string; value: any };
    spectator.output<{ action: string; value: any }>('messageEventFromQuestions').subscribe(event => {
      toggled_question_event = event;
    });

    mockQuestionsSelector.setResult(a_question_list);
    mockStore.refreshState();
    spectator.detectChanges();
    let an_existing_question_toggle_button = spectator.query(`button[id="toggle-question-${a_question.id}"]`);
    spectator.click(an_existing_question_toggle_button);

    expect(toggled_question_event.action).toEqual('question-toggle');
    expect(toggled_question_event.value.questionId).toEqual(a_question.id);
  });
});
