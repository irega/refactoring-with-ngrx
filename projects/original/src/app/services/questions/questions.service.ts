import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  create(question): Observable<any> {
    return from(
      new Promise(resolve => {
        this.http
          .get(`api/questionGroups`)
          .toPromise()
          .then((allQuestionGroups: any) => {
            const allQuestionIds = [];
            allQuestionGroups.forEach(qg =>
              qg.questions.forEach(q => allQuestionIds.push(q.id))
            );
            const maxQuestionId = Math.max(...allQuestionIds);
            const questionToCreate = {
              ...question,
              id: maxQuestionId + 1,
              answers: []
            };
            const questionGroup = allQuestionGroups.find(
              qg => qg.id === question.questionGroupId
            );
            questionGroup.questions.push(questionToCreate);
            this.http
              .put(`api/questionGroups/${questionGroup.id}`, questionGroup)
              .toPromise()
              .then(() => resolve(questionToCreate));
          });
      })
    );
  }

  update(question): Observable<any> {
    return from(
      new Promise(resolve => {
        this.http
          .get(`api/questionGroups/${question.questionGroupId}`)
          .toPromise()
          .then((questionGroup: any) => {
            const questionToUpdateIndex = questionGroup.questions.findIndex(
              q => q.id === question.id
            );
            questionGroup.questions[questionToUpdateIndex] = Object.assign(
              {},
              questionGroup.questions[questionToUpdateIndex],
              question
            );
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
            questionGroupWithQuestionToDelete.questions.splice(
              questionToDeleteIndex,
              1
            );
            this.http
              .put(
                `api/questionGroups/${questionGroupWithQuestionToDelete.id}`,
                questionGroupWithQuestionToDelete
              )
              .toPromise()
              .then(() => resolve());
          });
      })
    );
  }
}
