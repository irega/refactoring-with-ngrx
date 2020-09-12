import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html'
})
export class TopicsComponent {
  private _topics: any[] = [];
  @Input() set topics(topics: any[]) {
    this._topics = topics;
    this.updateSelectedTopics();
  }
  get topics() {
    return this._topics;
  }

  private _selectedTopicIds: any[] = [];
  @Input() set selectedTopicIds(selectedTopicIds: any[]) {
    this._selectedTopicIds = selectedTopicIds;
    this.updateSelectedTopics();
  }
  get selectedTopicIds() {
    return this._selectedTopicIds;
  }

  @Output() messageEventFromTopics = new EventEmitter<{ action: string; value: any }>();
  selectedTopics: any[];

  private updateSelectedTopics() {
    this.selectedTopics = this.selectedTopicIds.map(st => this.topics.find(t => t.id === st));
  }
}
