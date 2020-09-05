import { HttpClientModule } from '@angular/common/http';
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

describe('The load question groups effect', () => {
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
    questionGroupsService.getAll.reset();
  });

  it('should return a load question groups success action', done => {
    const a_question_group_list = [Given.a_question_group()];
    actions$ = of({ type: QuestionGroupsActionTypes.LOAD });

    const questionGroupsService = spectator.inject<QuestionGroupsService>(QuestionGroupsService);
    questionGroupsService.getAll.and.callFake(() => of(a_question_group_list));

    spectator.service.loadQuestionGroups$.subscribe(
      (action: { type: QuestionGroupsActionTypes; questionGroups: QuestionGroup[] }) => {
        expect(action.type).toEqual(QuestionGroupsActionTypes.LOAD_SUCCESS);
        expect(action.questionGroups).toEqual(a_question_group_list);
        done();
      }
    );
  });

  it('should return a load question groups error action', done => {
    actions$ = of({ type: QuestionGroupsActionTypes.LOAD });

    const questionGroupsService = spectator.inject<QuestionGroupsService>(QuestionGroupsService);
    questionGroupsService.getAll.and.throwError('an error');

    spectator.service.loadQuestionGroups$.subscribe(action => {
      expect(action.type).toEqual(QuestionGroupsActionTypes.LOAD_ERROR);
      done();
    });
  });
});
