import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { forkJoin, of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AnswersService } from 'src/app/services/answers/answers.service';
import {
  AnswersActionTypes,
  create,
  createSuccess,
  deleteAnswer,
  deleteAnswerSuccess,
  editSuccess
} from 'src/app/state/answers/actions';
import * as fromCurrentQuestionGroup from '../../currentQuestionGroup/selectors';
import { State } from '../../definition';
import { LoaderActionTypes } from '../../loader/actions';
import { selectOpenedQuestion } from '../../questions/selectors';
import { Answer } from '../entities';

@Injectable()
export class AnswersEffects {
  constructor(private actions$: Actions, private answersService: AnswersService, private store: Store<State>) {}

  createAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(create),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.ACTIVATE })),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(fromCurrentQuestionGroup.selectCurrentQuestionGroup),
            this.store.select(selectOpenedQuestion)
          )
        )
      ),
      switchMap(([action, currentQuestionGroup, currentQuestion]) => {
        return this.answersService.create({
          id: null,
          questionGroupId: currentQuestionGroup.id,
          questionId: currentQuestion.id,
          text: action.payload.answer.text
        });
      }),
      map(answer => createSuccess({ payload: { answer } })),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE })),
      catchError(() => {
        this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE });
        return of({ type: AnswersActionTypes.CREATE_ERROR });
      })
    )
  );

  editAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswersActionTypes.EDIT),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.ACTIVATE })),
      exhaustMap((action: { payload: { answer: Answer } }) => this.answersService.update(action.payload.answer)),
      map(answer => editSuccess({ payload: { answer } })),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE })),
      catchError(() => {
        this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE });
        return of({ type: AnswersActionTypes.EDIT_ERROR });
      })
    )
  );

  deleteAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAnswer),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.ACTIVATE })),
      exhaustMap((action: { payload: { answerId: number } }) =>
        forkJoin([of(action.payload.answerId), this.answersService.delete(action.payload.answerId)])
      ),
      map(result => deleteAnswerSuccess({ payload: { answerId: result[0] } })),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE })),
      catchError(() => {
        this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE });
        return of({ type: AnswersActionTypes.DELETE_ERROR });
      })
    )
  );
}
