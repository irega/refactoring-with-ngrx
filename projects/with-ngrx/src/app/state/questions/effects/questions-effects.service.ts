import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, withLatestFrom, concatMap, switchMap } from 'rxjs/operators';
import { QuestionsActionTypes, createSuccess, create } from '../actions';
import { of } from 'rxjs';
import { State } from '../../definition';
import { Store } from '@ngrx/store';
import * as fromCurrentQuestionGroup from '../../currentQuestionGroup/selectors';
import { QuestionsService } from 'src/app/services/questions/questions.service';

@Injectable()
export class QuestionsEffects {
  constructor(private actions$: Actions, private questionsService: QuestionsService, private store: Store<State>) {}

  createQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(create),
      concatMap(action =>
        of(action).pipe(withLatestFrom(this.store.select(fromCurrentQuestionGroup.selectCurrentQuestionGroup)))
      ),
      switchMap(([action, currentQuestionGroup]) => {
        return this.questionsService.create({
          id: null,
          questionGroupId: currentQuestionGroup.id,
          text: action.payload.text
        });
      }),
      map(question => createSuccess({ payload: { question } })),
      catchError(() => {
        return of({ type: QuestionsActionTypes.CREATE_ERROR });
      })
    )
  );
}
