import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html'
})
export class TopicsComponent {
  selectTopicsModalParams: any = {
    title: 'Select topics',
    description: 'Select the topics related to the question group',
    input: [],
    show: false,
    ok: { text: 'OK' },
    cancel: { text: 'Cancel' }
  };

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
    this.selectTopicsModalParams = { ...this.selectTopicsModalParams, input: this.topics.map(t => t.name) };
  }

  showSelectTopicsModal() {
    this.selectTopicsModalParams = { ...this.selectTopicsModalParams, show: true };
  }

  handleSelectTopicsModalClose(params: any) {
    this.selectTopicsModalParams = { ...this.selectTopicsModalParams, show: false };
    if (params.confirmed) {
      const selectedTopics = this.topics.filter(t => params.input.find(i => t.name === i) !== undefined);
      this.messageEventFromTopics.emit({ action: 'topic-select', value: { topics: selectedTopics } });
    }
  }
}
