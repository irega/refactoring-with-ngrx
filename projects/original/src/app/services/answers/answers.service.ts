import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AnswersService {
  constructor(private http: HttpClient) {}

  getAll(questionGroupId: number, questionId: number): Observable<any> {
    return from(
      new Promise(resolve => {
        this.http
          .get(`api/questionGroups`)
          .toPromise()
          .then((allQuestionGroups: any) => {
            const allAnswers = [];
            allQuestionGroups.forEach(qg =>
              qg.questions.forEach(q =>
                q.answers.forEach(a => allAnswers.push(a))
              )
            );
            resolve(
              allAnswers.filter(
                a =>
                  a.questionId === questionId &&
                  a.questionGroupId === questionGroupId
              )
            );
          });
      })
    );
  }

  create(answer): Observable<any> {
    return from(
      new Promise(resolve => {
        this.http
          .get(`api/questionGroups`)
          .toPromise()
          .then((allQuestionGroups: any) => {
            const allAnswersIds = [];
            allQuestionGroups.forEach(qg =>
              qg.questions.forEach(q =>
                q.answers.forEach(a => allAnswersIds.push(a.id))
              )
            );
            const maxAnswerId = Math.max(...allAnswersIds);
            const answerToCreate = { ...answer, id: maxAnswerId + 1 };
            const questionGroup = allQuestionGroups.find(
              qg => qg.id === answer.questionGroupId
            );
            const question = questionGroup.questions.find(
              q => q.id === answer.questionId
            );
            question.answers.push(answerToCreate);
            this.http
              .put(`api/questionGroups/${questionGroup.id}`, questionGroup)
              .toPromise()
              .then(() => resolve(answerToCreate));
          });
      })
    );
  }

  update(answer): Observable<any> {
    return from(
      new Promise(resolve => {
        this.http
          .get(`api/questionGroups/${answer.questionGroupId}`)
          .toPromise()
          .then((questionGroup: any) => {
            const question = questionGroup.questions.find(
              q => q.id === answer.questionId
            );
            const answerToUpdateIndex = question.answers.findIndex(
              a => a.id === answer.id
            );
            question.answers[answerToUpdateIndex] = answer;
            this.http
              .put(`api/questionGroups/${questionGroup.id}`, questionGroup)
              .toPromise()
              .then(() => resolve(answer));
          });
      })
    );
  }

  delete(answerId: number): Observable<any> {
    return from(
      new Promise(resolve => {
        this.http
          .get(`api/questionGroups`)
          .toPromise()
          .then((allQuestionGroups: any) => {
            const questionGroupWithAnswerToDelete = allQuestionGroups.find(
              qg =>
                qg.questions.find(
                  q => q.answers.find(a => a.id === answerId) !== undefined
                ) !== undefined
            );
            const questionWithAnswerToDelete = questionGroupWithAnswerToDelete.questions.find(
              q => q.answers.find(a => a.id === answerId) !== undefined
            );
            const answerToDeleteIndex = questionWithAnswerToDelete.answers.findIndex(
              a => a.id === answerId
            );
            questionWithAnswerToDelete.answers.splice(answerToDeleteIndex, 1);
            this.http
              .put(
                `api/questionGroups/${questionGroupWithAnswerToDelete.id}`,
                questionGroupWithAnswerToDelete
              )
              .toPromise()
              .then(() => resolve());
          });
      })
    );
  }
}
