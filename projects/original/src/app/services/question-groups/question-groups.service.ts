import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class QuestionGroupsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get("api/questionGroups");
  }

  get(questionGroupId: number): Observable<any> {
    return this.http.get(`api/questionGroups/${questionGroupId}`);
  }

  create(questionGroup): Observable<any> {
    const questionGroupToCreate = { ...questionGroup, questions: [] };
    return this.http.post("api/questionGroups", questionGroupToCreate);
  }

  update(questionGroup): Observable<any> {
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
