import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionGroupsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get('api/questionGroups');
  }

  create(questionGroup: any): Observable<any> {
    return this.http.post('api/questionGroups', questionGroup);
  }

  update(questionGroup: any): Observable<any> {
    return this.http.put(`api/questionGroups/${questionGroup.id}`, questionGroup).pipe(map(() => questionGroup));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`api/questionGroups/${id}`);
  }
}
