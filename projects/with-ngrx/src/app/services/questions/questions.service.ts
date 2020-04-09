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
          .get(`api/questionGroups/${question.questionGroupId}`)
          .toPromise()
          .then((questionGroup: any) => {
            const maxQuestionId = Math.max(questionGroup.questions.map(q => q.id));
            const questionToCreate = { ...question, id: maxQuestionId + 1 };
            questionGroup.questions.push(questionToCreate);
            this.http
              .put(`api/questionGroups/${questionGroup.id}`, questionGroup)
              .toPromise()
              .then(() => resolve(question));
          });
      })
    );
  }
}
