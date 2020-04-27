import { AnswersActionTypes, createSuccess, create } from 'src/app/state/answers/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, catchError, concatMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../definition';
import * as fromCurrentQuestionGroup from '../../currentQuestionGroup/selectors';
import { AnswersService } from 'src/app/services/answers/answers.service';
import { selectOpenedQuestion } from '../../questions/selectors';

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
}
