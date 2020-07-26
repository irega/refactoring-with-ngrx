import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { forkJoin, of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AnswersService } from 'src/app/services/answers/answers.service';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { load as loadAnswers } from '../../answers/actions';
import * as fromCurrentQuestionGroup from '../../currentQuestionGroup/selectors';
import { State } from '../../definition';
import { deactivate, LoaderActionTypes } from '../../loader/actions';
import {
  create,
  createSuccess,
  deleteQuestionSuccess,
  editSuccess,
  QuestionsActionTypes,
  toggle,
  toggleSuccess
} from '../actions';
import { Question } from '../entities';
import * as fromQuestions from '../selectors';

@Injectable()
export class QuestionsEffects {
  constructor(
    private actions$: Actions,
    private questionsService: QuestionsService,
    private answersService: AnswersService,
    private store: Store<State>
  ) {}

  createQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(create),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.ACTIVATE })),
      concatMap(action =>
        of(action).pipe(withLatestFrom(this.store.select(fromCurrentQuestionGroup.selectCurrentQuestionGroup)))
      ),
      switchMap(([action, currentQuestionGroup]) => {
        return this.questionsService.create({
          id: null,
          questionGroupId: currentQuestionGroup.id,
          text: action.payload.text,
          isOpened: false
        });
      }),
      map(question => createSuccess({ payload: { question } })),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE })),
      catchError(() => {
        this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE });
        return of({ type: QuestionsActionTypes.CREATE_ERROR });
      })
    )
  );

  editQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActionTypes.EDIT),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.ACTIVATE })),
      exhaustMap((action: { payload: { question: Question } }) =>
        this.questionsService.update(action.payload.question)
      ),
      map(question => editSuccess({ payload: { question } })),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE })),
      catchError(() => {
        this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE });
        return of({ type: QuestionsActionTypes.EDIT_ERROR });
      })
    )
  );

  deleteQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActionTypes.DELETE),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.ACTIVATE })),
      exhaustMap((action: { payload: { questionId: number } }) =>
        forkJoin([of(action.payload.questionId), this.questionsService.delete(action.payload.questionId)])
      ),
      map(result => deleteQuestionSuccess({ payload: { questionId: result[0] } })),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE })),
      catchError(() => {
        this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE });
        return of({ type: QuestionsActionTypes.DELETE_ERROR });
      })
    )
  );

  toggle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggle),
      tap(() => this.store.dispatch({ type: LoaderActionTypes.ACTIVATE })),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store.select(fromQuestions.selectQuestionById, { id: action.payload.questionId }))
        )
      ),
      switchMap(([action, existingQuestion]) => {
        if (existingQuestion.isOpened) {
          this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE });
          return of(toggleSuccess({ payload: { questionId: action.payload.questionId } }));
        }

        return forkJoin([this.answersService.getAll(action.payload.questionId)]).pipe(
          switchMap(([answers]) => {
            return [
              loadAnswers({
                payload: {
                  answers: answers.map(({ id, questionGroupId, questionId, text }) => ({
                    id,
                    questionGroupId,
                    questionId,
                    text
                  }))
                }
              }),
              toggleSuccess({ payload: { questionId: action.payload.questionId } }),
              deactivate()
            ];
          })
        );
      }),
      catchError(() => {
        this.store.dispatch({ type: LoaderActionTypes.DEACTIVATE });
        return of({ type: QuestionsActionTypes.TOGGLE_ERROR });
      })
    )
  );
}
