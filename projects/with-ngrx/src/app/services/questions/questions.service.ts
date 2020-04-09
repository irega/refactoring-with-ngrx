import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Question } from 'src/app/state/questions/entities';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  create(question: Question): Observable<any> {
    return from(
      new Promise(resolve => {
        this.http
          .get(`api/questionGroups`)
          .toPromise()
          .then((allQuestionGroups: any) => {
            const allQuestionIds: number[] = allQuestionGroups.reduce((prev, current) => {
              return [...prev.questions.map(q => q.id), ...current.questions.map(q => q.id)];
            });
            const maxQuestionId = Math.max(...allQuestionIds);
            const questionToCreate = { ...question, id: maxQuestionId + 1 };
            const questionGroup = allQuestionGroups.find(qg => qg.id === question.questionGroupId);
            questionGroup.questions.push(questionToCreate);
            this.http
              .put(`api/questionGroups/${questionGroup.id}`, questionGroup)
              .toPromise()
              .then(() => resolve(question));
          });
      })
    );
  }

  update(question: Question): Observable<any> {
    return from(
      new Promise(resolve => {
        this.http
          .get(`api/questionGroups/${question.questionGroupId}`)
          .toPromise()
          .then((questionGroup: any) => {
            const questionToUpdateIndex = questionGroup.questions.findIndex(q => q.id === question.id);
            questionGroup.questions[questionToUpdateIndex] = question;
            this.http
              .put(`api/questionGroups/${questionGroup.id}`, questionGroup)
              .toPromise()
              .then(() => resolve(question));
          });
      })
    );
  }

  delete(questionId: number): Observable<any> {
    return from(
      new Promise(resolve => {
        this.http
          .get(`api/questionGroups`)
          .toPromise()
          .then((allQuestionGroups: any) => {
            const questionGroupWithQuestionToDelete = allQuestionGroups.find(
              qg => qg.questions.find(q => q.id === questionId) !== undefined
            );
            const questionToDeleteIndex = questionGroupWithQuestionToDelete.questions.findIndex(
              q => q.id === questionId
            );
            questionGroupWithQuestionToDelete.questions.splice(questionToDeleteIndex, 1);
            this.http
              .put(`api/questionGroups/${questionGroupWithQuestionToDelete.id}`, questionGroupWithQuestionToDelete)
              .toPromise()
              .then(() => resolve());
          });
      })
    );
  }
}
