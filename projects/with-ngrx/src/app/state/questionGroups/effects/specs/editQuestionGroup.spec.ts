import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { QuestionGroupsService } from 'src/app/services/question-groups/question-groups.service';
import { QuestionGroupsActionTypes } from '../../actions';
import { QuestionGroup } from '../../entities';
import { Given } from '../../shared/questionGroups.fixtures';
import { QuestionGroupsEffects } from '../questionGroups-effects.service';

describe('The edit question group effect', () => {
  let spectator: SpectatorService<QuestionGroupsEffects>;
  let actions$: Observable<Action>;
  const createService = createServiceFactory({
    service: QuestionGroupsEffects,
    imports: [HttpClientTestingModule],
    providers: [provideMockActions(() => actions$), provideMockStore()],
    mocks: [QuestionGroupsService]
  });

  beforeEach(() => {
    spectator = createService();
    const questionGroupsService = spectator.inject<QuestionGroupsService>(QuestionGroupsService);
    questionGroupsService.update.reset();
  });

  it('should return a edit question group success action', done => {
    const a_question_group = Given.a_question_group();
    actions$ = of({ type: QuestionGroupsActionTypes.EDIT, payload: { questionGroup: a_question_group } });

    const questionGroupsService = spectator.inject<QuestionGroupsService>(QuestionGroupsService);
    questionGroupsService.update.and.callFake(() => of(a_question_group));

    spectator.service.editQuestionGroup$.subscribe(
      (action: { type: QuestionGroupsActionTypes; questionGroup: QuestionGroup }) => {
        expect(action.type).toEqual(QuestionGroupsActionTypes.EDIT_SUCCESS);
        expect(action.questionGroup).toEqual(a_question_group);
        done();
      }
    );
  });

  it('should return a edit question group error action', done => {
    actions$ = of({ type: QuestionGroupsActionTypes.EDIT });

    const questionGroupsService = spectator.inject<QuestionGroupsService>(QuestionGroupsService);
    questionGroupsService.update.and.throwError('an error');

    spectator.service.editQuestionGroup$.subscribe((action: { type: QuestionGroupsActionTypes }) => {
      expect(action.type).toEqual(QuestionGroupsActionTypes.EDIT_ERROR);
      done();
    });
  });
});
