import { HttpClientModule } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { AnswersService } from 'src/app/services/answers/answers.service';
import { State } from 'src/app/state/definition';
import { Given as GivenFromQuestions } from '../../../questions/shared/questions.fixtures';
import { AnswersActionTypes } from '../../actions';
import { Answer } from '../../entities';
import { Given } from '../../shared/answers.fixtures';
import { AnswersEffects } from '../answers-effects.service';

const initialState: State = {
  answers: [],
  questions: [],
  questionGroups: [],
  currentQuestionGroup: { id: 0, name: '' },
  loader: { isActive: false, pendingRequests: 0 }
};

describe('The create answer effect', () => {
  let spectator: SpectatorService<AnswersEffects>;
  let actions$: Observable<Action>;
  const createService = createServiceFactory({
    service: AnswersEffects,
    imports: [HttpClientModule],
    providers: [provideMockActions(() => actions$), provideMockStore()],
    mocks: [AnswersService]
  });

  beforeEach(() => {
    spectator = createService();
    const answersService = spectator.inject<AnswersService>(AnswersService);
    answersService.create.reset();
  });

  it('should return a create answer success action', done => {
    const an_answer = Given.an_answer();
    const an_opened_question = new GivenFromQuestions()
      .a_question()
      .opened()
      .build();
    actions$ = of({ type: AnswersActionTypes.CREATE, payload: { answer: { text: an_answer.text } } });

    const answersService = spectator.inject<AnswersService>(AnswersService);
    answersService.create.and.callFake(() => of(an_answer));
    const mockStore = spectator.inject<MockStore<State>>(MockStore);
    mockStore.setState({ ...initialState, questions: [an_opened_question] });

    spectator.service.createAnswer$.subscribe((action: { type: AnswersActionTypes; payload: { answer: Answer } }) => {
      expect(action.type).toEqual(AnswersActionTypes.CREATE_SUCCESS);
      expect(action.payload.answer).toEqual(an_answer);
      done();
    });
  });

  it('should return a create answer error action', done => {
    actions$ = of({ type: AnswersActionTypes.CREATE });

    const answersService = spectator.inject<AnswersService>(AnswersService);
    answersService.create.and.throwError('an error');

    spectator.service.createAnswer$.subscribe((action: { type: AnswersActionTypes }) => {
      expect(action.type).toEqual(AnswersActionTypes.CREATE_ERROR);
      done();
    });
  });
});
