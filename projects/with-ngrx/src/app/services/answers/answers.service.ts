import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  constructor(private http: HttpClient) {}

  getAll(questionId: number): Observable<any> {
    return from(
      new Promise(resolve => {
        this.http
          .get(`api/questionGroups`)
          .toPromise()
          .then((allQuestionGroups: any) => {
            const allQuestions = allQuestionGroups.reduce((prev, current) => {
              return [...prev.questions, ...current.questions];
            });
            const allAnswers = allQuestions.reduce((prev, current) => {
              return [...prev.answers, ...current.answers];
            });
            resolve(allAnswers.filter(a => a.questionId === questionId));
          });
      })
    );
  }
}
