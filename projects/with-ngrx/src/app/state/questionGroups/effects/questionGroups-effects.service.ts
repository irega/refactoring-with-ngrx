import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import {
  QuestionGroupsActionTypes,
  loadSuccess,
  editSuccess,
  deleteQuestionGroupSuccess,
  createSuccess
} from '../actions';
import { of, forkJoin } from 'rxjs';
import { QuestionGroupsService } from 'src/app/services/question-groups/question-groups.service';
import { QuestionGroup } from '../entities';

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

  createQuestionGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionGroupsActionTypes.CREATE),
      exhaustMap((action: { payload: { id: number; name: string } }) =>
        this.questionGroupsService.create(action.payload)
      ),
      map(questionGroup => createSuccess({ questionGroup })),
      catchError(() => {
        return of({ type: QuestionGroupsActionTypes.CREATE_ERROR });
      })
    )
  );

  editQuestionGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionGroupsActionTypes.EDIT),
      exhaustMap((action: { payload: { questionGroup: QuestionGroup } }) =>
        this.questionGroupsService.update(action.payload.questionGroup)
      ),
      map(questionGroup => editSuccess({ questionGroup })),
      catchError(() => {
        return of({ type: QuestionGroupsActionTypes.EDIT_ERROR });
      })
    )
  );

  deleteQuestionGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionGroupsActionTypes.DELETE),
      exhaustMap((action: { payload: { questionGroupId: number } }) =>
        forkJoin([
          of(action.payload.questionGroupId),
          this.questionGroupsService.delete(action.payload.questionGroupId)
        ])
      ),
      map(result => deleteQuestionGroupSuccess({ questionGroupId: result[0] })),
      catchError(() => {
        return of({ type: QuestionGroupsActionTypes.DELETE_ERROR });
      })
    )
  );
}
