import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.http.post('api/questionGroups', questionGroup);
  }

  update(questionGroup: QuestionGroup): Observable<any> {
    return this.http.put(`api/questionGroups/${questionGroup.id}`, questionGroup).pipe(map(() => questionGroup));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`api/questionGroups/${id}`);
  }
}
