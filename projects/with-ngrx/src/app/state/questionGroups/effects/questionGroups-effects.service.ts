import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { forkJoin, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { QuestionGroupsService } from 'src/app/services/question-groups/question-groups.service';
import { State } from '../../definition';
import { LoaderActionTypes } from '../../loader/actions';
import {
  createSuccess,
  deleteQuestionGroupSuccess,
  editSuccess,
  loadSuccess,
  QuestionGroupsActionTypes
} from '../actions';
import { QuestionGroup } from '../entities';

@Injectable()
export class QuestionGroupsEffects {
  constructor(
    private actions$: Actions,
    private questionGroupsService: QuestionGroupsService,
    private store: Store<State>
  ) {}

  loadQuestionGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionGroupsActionTypes.LOAD),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.ACTIVATE })),
      exhaustMap(() => this.questionGroupsService.getAll()),
      map(questionGroups => loadSuccess({ questionGroups })),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE })),
      catchError(() => {
        this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE });
        return of({ type: QuestionGroupsActionTypes.LOAD_ERROR });
      })
    )
  );

  createQuestionGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionGroupsActionTypes.CREATE),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.ACTIVATE })),
      exhaustMap((action: { payload: { id: number; name: string } }) =>
        this.questionGroupsService.create(action.payload)
      ),
      map(questionGroup => createSuccess({ questionGroup })),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE })),
      catchError(() => {
        this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE });
        return of({ type: QuestionGroupsActionTypes.CREATE_ERROR });
      })
    )
  );

  editQuestionGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionGroupsActionTypes.EDIT),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.ACTIVATE })),
      exhaustMap((action: { payload: { questionGroup: QuestionGroup } }) =>
        this.questionGroupsService.update(action.payload.questionGroup)
      ),
      map(questionGroup => editSuccess({ questionGroup })),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE })),
      catchError(() => {
        this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE });
        return of({ type: QuestionGroupsActionTypes.EDIT_ERROR });
      })
    )
  );

  deleteQuestionGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionGroupsActionTypes.DELETE),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.ACTIVATE })),
      exhaustMap((action: { payload: { questionGroupId: number } }) =>
        forkJoin([
          of(action.payload.questionGroupId),
          this.questionGroupsService.delete(action.payload.questionGroupId)
        ])
      ),
      map(result => deleteQuestionGroupSuccess({ questionGroupId: result[0] })),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE })),
      catchError(() => {
        this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE });
        return of({ type: QuestionGroupsActionTypes.DELETE_ERROR });
      })
    )
  );
}
