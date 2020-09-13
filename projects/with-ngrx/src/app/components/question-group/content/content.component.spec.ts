import { FormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { CustomModalService } from 'src/app/services/custom-modal/custom-modal.service';
import { State } from 'src/app/state/definition';
import { ContentComponent } from './content.component';
import { AnswersComponent } from './questions/answers/answers.component';
import { QuestionsComponent } from './questions/questions.component';
import { SelectTopicsModalComponent } from './topics/select-topics-modal/select-topics-modal.component';
import { TopicsComponent } from './topics/topics.component';

const initialState: State = {
  answers: [],
  questions: [],
  questionGroups: [],
  currentQuestionGroup: { id: 0, name: '' },
  loader: { isActive: false, pendingRequests: 0 }
};

describe('The content component', () => {
  let spectator: Spectator<ContentComponent>;
  const createComponent = createComponentFactory({
    component: ContentComponent,
    declarations: [QuestionsComponent, TopicsComponent, AnswersComponent, SelectTopicsModalComponent],
    imports: [FormsModule],
    providers: [CustomModalService, provideMockStore({ initialState })]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });
});
