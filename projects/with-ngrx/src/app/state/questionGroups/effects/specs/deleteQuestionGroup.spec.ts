import { HttpClientModule } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { QuestionGroupsService } from 'src/app/services/question-groups/question-groups.service';
import { QuestionGroupsActionTypes } from '../../actions';
import { QuestionGroupsEffects } from '../questionGroups-effects.service';

describe('The delete question group effect', () => {
  let spectator: SpectatorService<QuestionGroupsEffects>;
  let actions$: Observable<Action>;
  const createService = createServiceFactory({
    service: QuestionGroupsEffects,
    imports: [HttpClientModule],
    providers: [provideMockActions(() => actions$), provideMockStore()],
    mocks: [QuestionGroupsService]
  });

  beforeEach(() => {
    spectator = createService();
    const questionGroupsService = spectator.inject<QuestionGroupsService>(QuestionGroupsService);
    questionGroupsService.delete.reset();
  });

  it('should return a delete question group success action', done => {
    const a_question_group_id = 1;
    actions$ = of({ type: QuestionGroupsActionTypes.DELETE, payload: { questionGroupId: a_question_group_id } });

    const questionGroupsService = spectator.inject<QuestionGroupsService>(QuestionGroupsService);
    questionGroupsService.delete.and.callFake(() => of({}));

    spectator.service.deleteQuestionGroup$.subscribe(
      (action: { type: QuestionGroupsActionTypes; questionGroupId: number }) => {
        expect(action.type).toEqual(QuestionGroupsActionTypes.DELETE_SUCCESS);
        expect(action.questionGroupId).toEqual(a_question_group_id);
        done();
      }
    );
  });

  it('should return a delete question group error action', done => {
    actions$ = of({ type: QuestionGroupsActionTypes.DELETE });

    const questionGroupsService = spectator.inject<QuestionGroupsService>(QuestionGroupsService);
    questionGroupsService.delete.and.throwError('an error');

    spectator.service.deleteQuestionGroup$.subscribe((action: { type: QuestionGroupsActionTypes }) => {
      expect(action.type).toEqual(QuestionGroupsActionTypes.DELETE_ERROR);
      done();
    });
  });
});
