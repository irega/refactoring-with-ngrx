import { FormsModule } from '@angular/forms';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';
import { Given as GivenFromAnswers } from 'src/app/state/answers/shared/answers.fixtures';
import { State } from 'src/app/state/definition';
import { Given } from 'src/app/state/questions/shared/questions.fixtures';
import { AnswersComponent } from '../answers/answers.component';
import { QuestionsComponent } from '../questions.component';

const initialState: State = {
  answers: [],
  questions: [],
  questionGroups: [],
  currentQuestionGroup: { id: 0, name: '' },
  loader: { isActive: false, pendingRequests: 0 }
};

describe('The questions component', () => {
  let spectator: Spectator<QuestionsComponent>;
  let mockStore: SpyObject<MockStore>;
  const createComponent = createComponentFactory({
    component: QuestionsComponent,
    declarations: [AnswersComponent],
    imports: [FormsModule],
    providers: [CustomModalService, provideMockStore({ initialState })]
  });

  beforeEach(() => {
    spectator = createComponent();
    mockStore = spectator.inject(MockStore);
  });

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });

  it('should load the questions', () => {
    const a_question = Given.a_question();
    const a_question_list = [a_question];

    mockStore.setState({ ...initialState, questions: a_question_list });
    spectator.detectChanges();

    const an_existing_question_input = spectator.query(`input[id="question-${a_question.id}"]`);
    expect(an_existing_question_input).toBeTruthy();
  });

  it('should show the expand button for a closed question', () => {
    const a_closed_question = new Given()
      .a_question()
      .closed()
      .build();
    const a_question_list = [a_closed_question];

    mockStore.setState({ ...initialState, questions: a_question_list });
    spectator.detectChanges();

    const an_existing_question_toggle_button = spectator.query(`button[id="toggle-question-${a_closed_question.id}"]`);
    expect(an_existing_question_toggle_button.textContent.trim()).toEqual('Expand');
  });

  it('should show the collapse button for an opened question', () => {
    const an_opened_question = new Given()
      .a_question()
      .opened()
      .build();
    const a_question_list = [an_opened_question];

    mockStore.setState({ ...initialState, questions: a_question_list });
    spectator.detectChanges();

    const an_existing_question_toggle_button = spectator.query(`button[id="toggle-question-${an_opened_question.id}"]`);
    expect(an_existing_question_toggle_button.textContent.trim()).toEqual('Collapse');
  });

  it('should show the answer list for an opened question', () => {
    const an_opened_question = new Given()
      .a_question()
      .opened()
      .build();
    const a_question_list = [an_opened_question];
    const an_answer = GivenFromAnswers.an_answer();
    const an_answer_list = [an_answer];

    mockStore.setState({ ...initialState, questions: a_question_list, answers: an_answer_list });
    spectator.detectChanges();

    const answer_list = spectator.query('app-answers');
    expect(answer_list).toBeTruthy();
  });
});
