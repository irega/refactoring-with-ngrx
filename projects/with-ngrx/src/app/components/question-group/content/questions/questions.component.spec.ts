import { FormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';
import { State } from 'src/app/state/definition';
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
  const createComponent = createComponentFactory({
    component: QuestionsComponent,
    declarations: [AnswersComponent],
    imports: [FormsModule],
    providers: [CustomModalService, provideMockStore({ initialState })]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });

  xit('should create a question', () => {});

  xit('should edit a question', () => {});

  xit('should delete a question', () => {});

  xit('should expand a question', () => {});

  xit('should collapse a question', () => {});
});
