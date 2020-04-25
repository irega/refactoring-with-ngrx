import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService implements InMemoryDbService {
  createDb() {
    const questionGroups = [
      {
        id: 1,
        name: 'Question Group 1',
        questions: [
          {
            id: 1,
            questionGroupId: 1,
            text: 'A question',
            answers: [
              { id: 1, questionGroupId: 1, questionId: 1, text: 'An answer' },
              { id: 2, questionGroupId: 1, questionId: 1, text: 'Another answer' }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Question Group 2',
        questions: [
          {
            id: 2,
            questionGroupId: 2,
            text: 'A question',
            answers: [
              { id: 2, questionGroupId: 2, questionId: 2, text: 'An answer' },
              { id: 3, questionGroupId: 2, questionId: 2, text: 'Another answer' }
            ]
          }
        ]
      }
    ];
    return { questionGroups };
  }
}
