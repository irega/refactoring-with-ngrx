import {
  AnswersActionTypes,
  createSuccess,
  create,
  deleteAnswer,
  deleteAnswerSuccess,
  editSuccess
} from 'src/app/state/answers/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, catchError, concatMap, withLatestFrom, switchMap, exhaustMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../definition';
import * as fromCurrentQuestionGroup from '../../currentQuestionGroup/selectors';
import { AnswersService } from 'src/app/services/answers/answers.service';
import { selectOpenedQuestion } from '../../questions/selectors';
import { Answer } from '../entities';

@Injectable()
export class AnswersEffects {
  constructor(private actions$: Actions, private answersService: AnswersService, private store: Store<State>) {}

  createAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(create),
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
      catchError(() => {
        return of({ type: AnswersActionTypes.CREATE_ERROR });
      })
    )
  );

  editAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnswersActionTypes.EDIT),
      exhaustMap((action: { payload: { answer: Answer } }) => this.answersService.update(action.payload.answer)),
      map(answer => editSuccess({ payload: { answer } })),
      catchError(() => {
        return of({ type: AnswersActionTypes.EDIT_ERROR });
      })
    )
  );

  deleteAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAnswer),
      exhaustMap((action: { payload: { answerId: number } }) =>
        forkJoin([of(action.payload.answerId), this.answersService.delete(action.payload.answerId)])
      ),
      map(result => deleteAnswerSuccess({ payload: { answerId: result[0] } })),
      catchError(() => {
        return of({ type: AnswersActionTypes.DELETE_ERROR });
      })
    )
  );
}
