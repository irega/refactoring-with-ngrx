import { HttpClientModule } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { AnswersService } from 'src/app/services/answers/answers.service';
import { AnswersActionTypes } from 'src/app/state/answers/actions';
import { State } from 'src/app/state/definition';
import { LoaderActionTypes } from 'src/app/state/loader/actions';
import { Given as GivenFromAnswers } from '../../../answers/shared/answers.fixtures';
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

describe('The toggle question effect', () => {
  let spectator: SpectatorService<QuestionsEffects>;
  let actions$: Observable<Action>;
  const createService = createServiceFactory({
    service: QuestionsEffects,
    imports: [HttpClientModule],
    providers: [provideMockActions(() => actions$), provideMockStore({ initialState })],
    mocks: [AnswersService]
  });

  beforeEach(() => {
    spectator = createService();
  });

  describe('when the question is already opened', () => {
    it('should return a toggle question success action', done => {
      const an_opened_question = new Given()
        .a_question()
        .opened()
        .build();
      actions$ = of({
        type: QuestionsActionTypes.TOGGLE,
        payload: { questionId: an_opened_question.id }
      });
      const mockStore = spectator.inject<MockStore<State>>(MockStore);
      mockStore.setState({ ...initialState, questions: [an_opened_question] });

      spectator.service.toggle$.subscribe((action: { type: QuestionsActionTypes; payload: { questionId: number } }) => {
        expect(action.type).toEqual(QuestionsActionTypes.TOGGLE_SUCCESS);
        expect(action.payload.questionId).toEqual(an_opened_question.id);
        done();
      });
    });
  });

  describe('when the question is not opened', () => {
    it('should return a toggle question success action', done => {
      const a_closed_question: Question = new Given()
        .a_question()
        .closed()
        .build();

      actions$ = of({
        type: QuestionsActionTypes.TOGGLE,
        payload: { questionId: a_closed_question.id }
      });
      const answersService = spectator.inject<AnswersService>(AnswersService);
      answersService.getAll.and.callFake(() => of([GivenFromAnswers.an_answer()]));

      const mockStore = spectator.inject<MockStore<State>>(MockStore);
      mockStore.setState({ ...initialState, questions: [a_closed_question] });

      spectator.service.toggle$.subscribe((action: { type: QuestionsActionTypes; payload: { questionId: number } }) => {
        if (action.type === QuestionsActionTypes.TOGGLE_SUCCESS) {
          expect(action.payload.questionId).toEqual(a_closed_question.id);
          done();
        }
      });
    });

    it('should load the answers', done => {
      const a_closed_question: Question = new Given()
        .a_question()
        .closed()
        .build();

      actions$ = of({
        type: QuestionsActionTypes.TOGGLE,
        payload: { questionId: a_closed_question.id }
      });
      const answersService = spectator.inject<AnswersService>(AnswersService);
      const an_answer = new GivenFromAnswers().an_answer().build();
      answersService.getAll.and.callFake(() => of([an_answer]));

      const mockStore = spectator.inject<MockStore<State>>(MockStore);
      mockStore.setState({ ...initialState, questions: [a_closed_question] });

      spectator.service.toggle$.subscribe(action => {
        if (action.type === AnswersActionTypes.LOAD) {
          const answer = action.payload.answers.find(a => a.id === an_answer.id);
          expect(answer).toEqual(an_answer);
          done();
        }
      });
    });

    it('should hide the loader', done => {
      const a_closed_question: Question = new Given()
        .a_question()
        .closed()
        .build();

      actions$ = of({
        type: QuestionsActionTypes.TOGGLE,
        payload: { questionId: a_closed_question.id }
      });

      const answersService = spectator.inject<AnswersService>(AnswersService);
      answersService.getAll.and.callFake(() => of([GivenFromAnswers.an_answer()]));

      const mockStore = spectator.inject<MockStore<State>>(MockStore);
      mockStore.setState({ ...initialState, questions: [a_closed_question] });

      spectator.service.toggle$.subscribe(action => {
        if (action.type === LoaderActionTypes.DEACTIVATE) {
          expect(action.type).toEqual(LoaderActionTypes.DEACTIVATE);
          done();
        }
      });
    });
  });

  it('should return a toggle question error action', done => {
    actions$ = of({ type: QuestionsActionTypes.TOGGLE });

    const answersService = spectator.inject<AnswersService>(AnswersService);
    answersService.getAll.and.throwError('an error');

    spectator.service.toggle$.subscribe((action: { type: QuestionsActionTypes }) => {
      expect(action.type).toEqual(QuestionsActionTypes.TOGGLE_ERROR);
      done();
    });
  });
});
