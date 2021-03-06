import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from "@angular/core";
import { CustomModalService } from "src/app/components/custom-modal/custom-modal.service";

@Component({
  selector: "app-question-group-topics",
  templateUrl: "./question-group-topics.component.html"
})
export class QuestionGroupTopicsComponent implements OnChanges {
  @Output() messageEventFromTopics = new EventEmitter<any>();
  @Input() topics: any[];
  @Input() selectedTopicIds: any[];
  public selectedTopics: any[];

  private selectTopicsModalParams: any = {
    title: "Select topics",
    description: "Select the topics related to the question group",
    input: [],
    show: false,
    ok: { text: "OK" },
    cancel: { text: "Cancel" }
  };

  constructor(private customModalService: CustomModalService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const topics = changes.topics ? changes.topics.currentValue : this.topics;
    const selectedTopicIds = changes.selectedTopicIds
      ? changes.selectedTopicIds.currentValue
      : this.selectedTopicIds;

    this.selectedTopics = selectedTopicIds.map(st =>
      topics.find(t => t.id === st)
    );

    this.selectTopicsModalParams = {
      ...this.selectTopicsModalParams,
      input: topics.map(t => t.name)
    };
  }

  showSelectTopicsModal() {
    this.selectTopicsModalParams = {
      ...this.selectTopicsModalParams,
      show: true
    };

    this.customModalService.show(this.selectTopicsModalParams);
    const subscription = this.customModalService.stateChange.subscribe(
      params => {
        subscription.unsubscribe();
        if (params.confirmed) {
          const selectedTopics = this.topics.filter(
            t => params.input.find(i => t.name === i) !== undefined
          );
          this.messageEventFromTopics.emit({
            action: "topic-select",
            value: selectedTopics
          });
        }
      }
    );
  }
}
