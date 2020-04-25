import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, withLatestFrom, concatMap, switchMap, exhaustMap } from 'rxjs/operators';
import {
  QuestionsActionTypes,
  createSuccess,
  create,
  editSuccess,
  deleteQuestionSuccess,
  toggle,
  toggleSuccess
} from '../actions';
import { of, forkJoin } from 'rxjs';
import { State } from '../../definition';
import { Store } from '@ngrx/store';
import * as fromCurrentQuestionGroup from '../../currentQuestionGroup/selectors';
import * as fromQuestions from '../selectors';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { Question } from '../entities';
import { AnswersService } from 'src/app/services/answers/answers.service';
import { load as loadAnswers } from '../../answers/actions';

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
      catchError(() => {
        return of({ type: QuestionsActionTypes.CREATE_ERROR });
      })
    )
  );

  editQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActionTypes.EDIT),
      exhaustMap((action: { payload: { question: Question } }) =>
        this.questionsService.update(action.payload.question)
      ),
      map(question => editSuccess({ payload: { question } })),
      catchError(() => {
        return of({ type: QuestionsActionTypes.EDIT_ERROR });
      })
    )
  );

  deleteQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionsActionTypes.DELETE),
      exhaustMap((action: { payload: { questionId: number } }) =>
        forkJoin([of(action.payload.questionId), this.questionsService.delete(action.payload.questionId)])
      ),
      map(result => deleteQuestionSuccess({ payload: { questionId: result[0] } })),
      catchError(() => {
        return of({ type: QuestionsActionTypes.DELETE_ERROR });
      })
    )
  );

  toggle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggle),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store.select(fromQuestions.selectQuestionById, { id: action.payload.questionId }))
        )
      ),
      switchMap(([action, existingQuestion]) => {
        if (existingQuestion.isOpened) {
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
              toggleSuccess({ payload: { questionId: action.payload.questionId } })
            ];
          })
        );
      }),
      catchError(() => {
        return of({ type: QuestionsActionTypes.TOGGLE_ERROR });
      })
    )
  );
}
