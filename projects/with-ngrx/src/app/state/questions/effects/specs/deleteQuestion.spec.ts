import { HttpClientModule } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { QuestionsActionTypes } from '../../actions';
import { QuestionsEffects } from '../questions-effects.service';

describe('The delete question effect', () => {
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
    questionsService.delete.reset();
  });

  it('should return a delete question success action', done => {
    const a_question_id = 1;
    actions$ = of({ type: QuestionsActionTypes.DELETE, payload: { questionId: a_question_id } });

    const questionsService = spectator.inject<QuestionsService>(QuestionsService);
    questionsService.delete.and.callFake(() => of({}));

    spectator.service.deleteQuestion$.subscribe(
      (action: { type: QuestionsActionTypes; payload: { questionId: number } }) => {
        expect(action.type).toEqual(QuestionsActionTypes.DELETE_SUCCESS);
        expect(action.payload.questionId).toEqual(a_question_id);
        done();
      }
    );
  });

  it('should return a delete question error action', done => {
    actions$ = of({ type: QuestionsActionTypes.DELETE });

    const questionsService = spectator.inject<QuestionsService>(QuestionsService);
    questionsService.delete.and.throwError('an error');

    spectator.service.deleteQuestion$.subscribe((action: { type: QuestionsActionTypes }) => {
      expect(action.type).toEqual(QuestionsActionTypes.DELETE_ERROR);
      done();
    });
  });
});
