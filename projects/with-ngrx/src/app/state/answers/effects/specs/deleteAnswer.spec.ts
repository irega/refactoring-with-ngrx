import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { AnswersService } from 'src/app/services/answers/answers.service';
import { AnswersActionTypes } from '../../actions';
import { AnswersEffects } from '../answers-effects.service';

describe('The delete answer effect', () => {
  let spectator: SpectatorService<AnswersEffects>;
  let actions$: Observable<Action>;
  const createService = createServiceFactory({
    service: AnswersEffects,
    imports: [HttpClientTestingModule],
    providers: [provideMockActions(() => actions$), provideMockStore()],
    mocks: [AnswersService]
  });

  beforeEach(() => {
    spectator = createService();
    const answersService = spectator.inject<AnswersService>(AnswersService);
    answersService.delete.reset();
  });

  it('should return a delete answer success action', done => {
    const a_question_id = 1;
    actions$ = of({ type: AnswersActionTypes.DELETE, payload: { answerId: a_question_id } });

    const answersService = spectator.inject<AnswersService>(AnswersService);
    answersService.delete.and.callFake(() => of({}));

    spectator.service.deleteAnswer$.subscribe((action: { type: AnswersActionTypes; payload: { answerId: number } }) => {
      expect(action.type).toEqual(AnswersActionTypes.DELETE_SUCCESS);
      expect(action.payload.answerId).toEqual(a_question_id);
      done();
    });
  });

  it('should return a delete answer error action', done => {
    actions$ = of({ type: AnswersActionTypes.DELETE });

    const answersService = spectator.inject<AnswersService>(AnswersService);
    answersService.delete.and.throwError('an error');

    spectator.service.deleteAnswer$.subscribe((action: { type: AnswersActionTypes }) => {
      expect(action.type).toEqual(AnswersActionTypes.DELETE_ERROR);
      done();
    });
  });
});
