import { HttpClientModule } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { QuestionsActionTypes } from '../../actions';
import { Question } from '../../entities';
import { Given } from '../../shared/questions.fixtures';
import { QuestionsEffects } from '../questions-effects.service';

describe('The edit question effect', () => {
  let spectator: SpectatorService<QuestionsEffects>;
  let actions$: Observable<Action>;
  const createService = createServiceFactory({
    service: QuestionsEffects,
    imports: [HttpClientModule],
    providers: [provideMockActions(() => actions$), provideMockStore()],
    mocks: [QuestionsService]
  });

  beforeEach(() => {
    spectator = createService();
    const questionsService = spectator.inject<QuestionsService>(QuestionsService);
    questionsService.update.reset();
  });

  it('should return a edit question success action', done => {
    const a_question = Given.a_question();
    actions$ = of({ type: QuestionsActionTypes.EDIT, payload: { question: a_question } });

    const questionsService = spectator.inject<QuestionsService>(QuestionsService);
    questionsService.update.and.callFake(() => of(a_question));

    spectator.service.editQuestion$.subscribe(
      (action: { type: QuestionsActionTypes; payload: { question: Question } }) => {
        expect(action.type).toEqual(QuestionsActionTypes.EDIT_SUCCESS);
        expect(action.payload.question).toEqual(a_question);
        done();
      }
    );
  });

  it('should return a edit question error action', done => {
    actions$ = of({ type: QuestionsActionTypes.EDIT });

    const questionsService = spectator.inject<QuestionsService>(QuestionsService);
    questionsService.update.and.throwError('an error');

    spectator.service.editQuestion$.subscribe((action: { type: QuestionsActionTypes }) => {
      expect(action.type).toEqual(QuestionsActionTypes.EDIT_ERROR);
      done();
    });
  });
});
