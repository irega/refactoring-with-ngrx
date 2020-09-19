import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-question-group-content",
  templateUrl: "./question-group-content.component.html"
})
export class QuestionGroupContentComponent {
  @Output() messageEventFromContent = new EventEmitter<any>();
  @Input() topics: any[] = [];
  @Input() selectedTopicIds: any[] = [];
  @Input() questions: Array<any>;
  @Input() answers: Array<any>;

  receiveMessageFromQuestions(event: { action: string; value: any }) {
    event.action = "content-" + event.action;
    this.messageEventFromContent.emit(event);
  }

  receiveMessageFromTopics(event: { action: string; value: any }) {
    event.action = "content-" + event.action;
    this.messageEventFromContent.emit(event);
  }
}
