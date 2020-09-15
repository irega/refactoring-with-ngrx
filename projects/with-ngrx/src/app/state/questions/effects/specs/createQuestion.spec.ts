import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { State } from 'src/app/state/definition';
import { QuestionsActionTypes } from '../../actions';
import { Question } from '../../entities';
import { Given } from '../../shared/questions.fixtures';
import { QuestionsEffects } from '../questions-effects.service';

const initialState: State = {
  answers: [],
  questions: [],
  questionGroups: [],
  currentQuestionGroup: { id: 0, name: '' },
  loader: { isActive: false, pendingRequests: 0 }
};

describe('The create question effect', () => {
  let spectator: SpectatorService<QuestionsEffects>;
  let actions$: Observable<Action>;
  const createService = createServiceFactory({
    service: QuestionsEffects,
    imports: [HttpClientTestingModule],
    providers: [provideMockActions(() => actions$), provideMockStore()],
    mocks: [QuestionsService]
  });

  beforeEach(() => {
    spectator = createService();
    const questionsService = spectator.inject<QuestionsService>(QuestionsService);
    questionsService.create.reset();
  });

  it('should return a create question success action', done => {
    const a_question = Given.a_question();
    actions$ = of({ type: QuestionsActionTypes.CREATE, payload: { text: a_question.text } });

    const questionsService = spectator.inject<QuestionsService>(QuestionsService);
    questionsService.create.and.callFake(() => of(a_question));
    const mockStore = spectator.inject<MockStore<State>>(MockStore);
    mockStore.setState({ ...initialState });

    spectator.service.createQuestion$.subscribe(
      (action: { type: QuestionsActionTypes; payload: { question: Question } }) => {
        expect(action.type).toEqual(QuestionsActionTypes.CREATE_SUCCESS);
        expect(action.payload.question).toEqual(a_question);
        done();
      }
    );
  });

  it('should return a create question error action', done => {
    actions$ = of({ type: QuestionsActionTypes.CREATE });

    const questionsService = spectator.inject<QuestionsService>(QuestionsService);
    questionsService.create.and.throwError('an error');

    spectator.service.createQuestion$.subscribe((action: { type: QuestionsActionTypes }) => {
      expect(action.type).toEqual(QuestionsActionTypes.CREATE_ERROR);
      done();
    });
  });
});
