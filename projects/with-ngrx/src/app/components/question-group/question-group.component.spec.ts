import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { State } from 'src/app/state/definition';
import { ContentComponent } from './content/content.component';
import { AnswersComponent } from './content/questions/answers/answers.component';
import { QuestionsComponent } from './content/questions/questions.component';
import { SelectTopicsModalComponent } from './content/topics/select-topics-modal/select-topics-modal.component';
import { TopicsComponent } from './content/topics/topics.component';
import { QuestionGroupComponent } from './question-group.component';
import { SummaryComponent } from './summary/summary,.component';

const initialState: State = {
  answers: [],
  questions: [],
  questionGroups: [],
  currentQuestionGroup: { id: 0, name: '' },
  loader: { isActive: false, pendingRequests: 0 }
};

describe('The question group component', () => {
  let spectator: Spectator<QuestionGroupComponent>;
  const createComponent = createComponentFactory({
    component: QuestionGroupComponent,
    declarations: [
      SummaryComponent,
      ContentComponent,
      QuestionsComponent,
      TopicsComponent,
      AnswersComponent,
      SelectTopicsModalComponent
    ],
    imports: [RouterTestingModule, FormsModule, HttpClientTestingModule],
    providers: [provideMockStore({ initialState })]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });
});
