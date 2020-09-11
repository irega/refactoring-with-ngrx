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

describe('The create question group effect', () => {
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
    questionGroupsService.create.reset();
  });

  it('should return a create question group success action', done => {
    const a_question_group = Given.a_question_group();
    actions$ = of({
      type: QuestionGroupsActionTypes.CREATE,
      payload: { id: a_question_group.id, name: a_question_group.name }
    });

    const questionGroupsService = spectator.inject<QuestionGroupsService>(QuestionGroupsService);
    questionGroupsService.create.and.callFake(() => of(a_question_group));

    spectator.service.createQuestionGroup$.subscribe(
      (action: { type: QuestionGroupsActionTypes; questionGroup: QuestionGroup }) => {
        expect(action.type).toEqual(QuestionGroupsActionTypes.CREATE_SUCCESS);
        expect(action.questionGroup).toEqual(a_question_group);
        done();
      }
    );
  });

  it('should return a create question group error action', done => {
    actions$ = of({ type: QuestionGroupsActionTypes.CREATE });

    const questionGroupsService = spectator.inject<QuestionGroupsService>(QuestionGroupsService);
    questionGroupsService.create.and.throwError('an error');

    spectator.service.createQuestionGroup$.subscribe((action: { type: QuestionGroupsActionTypes }) => {
      expect(action.type).toEqual(QuestionGroupsActionTypes.CREATE_ERROR);
      done();
    });
  });
});
