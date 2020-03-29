import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { QuestionGroupsActionTypes, loadSuccess } from '../actions';
import { of } from 'rxjs';
import { QuestionGroupsService } from 'src/app/services/question-groups/question-groups.service';

@Injectable()
export class QuestionGroupsEffects {
  constructor(private actions$: Actions, private questionGroupsService: QuestionGroupsService) {}

  loadQuestionGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionGroupsActionTypes.LOAD),
      exhaustMap(() => this.questionGroupsService.getAll()),
      map(questionGroups => loadSuccess({ questionGroups })),
      catchError(() => {
        return of({ type: QuestionGroupsActionTypes.LOAD_ERROR });
      })
    )
  );
}
