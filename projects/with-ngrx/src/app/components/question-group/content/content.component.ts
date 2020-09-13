import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent {
  @Input() topics: any[] = [];
  @Input() selectedTopicIds: any[] = [];
  @Output() messageEventFromContent = new EventEmitter<{ action: string; value: any }>();

  receiveMessageFromQuestions(event: { action: string; value: any }) {
    event.action = 'content-' + event.action;
    this.messageEventFromContent.emit(event);
  }

  receiveMessageFromTopics(event: { action: string; value: any }) {
    event.action = 'content-' + event.action;
    this.messageEventFromContent.emit(event);
  }
}
