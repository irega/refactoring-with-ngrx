import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { QuestionGroup } from 'src/app/state/questionGroups/entities';

@Injectable({
  providedIn: 'root'
})
export class QuestionGroupsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get('api/questionGroups');
  }

  get(questionGroupId: number): Observable<any> {
    return this.http.get(`api/questionGroups/${questionGroupId}`);
  }

  create(questionGroup: QuestionGroup): Observable<any> {
    const questionGroupToCreate = { ...questionGroup, questions: [] };
    return this.http.post('api/questionGroups', questionGroupToCreate);
  }

  update(questionGroup: QuestionGroup): Observable<any> {
    return from(
      new Promise(resolve => {
        return this.http
          .put(`api/questionGroups/${questionGroup.id}`, questionGroup)
          .toPromise()
          .then(() => resolve(questionGroup));
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`api/questionGroups/${id}`);
  }
}
