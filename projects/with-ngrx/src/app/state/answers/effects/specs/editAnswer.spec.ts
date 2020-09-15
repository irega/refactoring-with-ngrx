import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { AnswersService } from 'src/app/services/answers/answers.service';
import { AnswersActionTypes } from '../../actions';
import { Answer } from '../../entities';
import { Given } from '../../shared/answers.fixtures';
import { AnswersEffects } from '../answers-effects.service';

describe('The edit answer effect', () => {
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
    answersService.update.reset();
  });

  it('should return a edit answer success action', done => {
    const an_answer = Given.an_answer();
    actions$ = of({ type: AnswersActionTypes.EDIT, payload: { answer: an_answer } });

    const answersService = spectator.inject<AnswersService>(AnswersService);
    answersService.update.and.callFake(() => of(an_answer));

    spectator.service.editAnswer$.subscribe((action: { type: AnswersActionTypes; payload: { answer: Answer } }) => {
      expect(action.type).toEqual(AnswersActionTypes.EDIT_SUCCESS);
      expect(action.payload.answer).toEqual(an_answer);
      done();
    });
  });

  it('should return a edit answer error action', done => {
    actions$ = of({ type: AnswersActionTypes.EDIT });

    const answersService = spectator.inject<AnswersService>(AnswersService);
    answersService.update.and.throwError('an error');

    spectator.service.editAnswer$.subscribe((action: { type: AnswersActionTypes }) => {
      expect(action.type).toEqual(AnswersActionTypes.EDIT_ERROR);
      done();
    });
  });
});
