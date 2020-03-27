import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { QuestionGroup } from '../state/questionGroups/entities';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService implements InMemoryDbService {
  createDb() {
    const questionGroups: QuestionGroup[] = [
      { id: 1, name: 'Question Group 1', image: null },
      { id: 2, name: 'Question Group 2', image: null },
      { id: 3, name: 'Question Group 3', image: null },
      { id: 4, name: 'Question Group 4', image: null }
    ];
    return { questionGroups };
  }
}
