import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from "@angular/core";
import { QuestionGroupsService } from "src/app/services/question-groups/question-groups.service";
import { TopicsService } from "src/app/services/topics/topics.service";

@Component({
  selector: "app-question-group",
  templateUrl: "./question-group.component.html"
})
export class QuestionGroupComponent implements OnChanges, OnDestroy {
  @Input() id: string;
  public questionGroup: any;
  public step: number;
  public numberOfQuestions: number;
  public questions: Array<any>;
  public answers: Array<any>;
  public topics: Array<any>;
  public selectedTopicIds: Array<any>;

  constructor(
    private ref: ChangeDetectorRef,
    private questionGroupsService: QuestionGroupsService,
    private topicsService: TopicsService
  ) {
    this.step = 0;
    this.questionGroup = {};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.id) {
      return;
    }
    if (changes.id.currentValue) {
      this.questionGroupsService
        .get(+this.id)
        .toPromise()
        .then(data => {
          this.questionGroup = data;
          this.selectedTopicIds = this.questionGroup.topicIds;
          this.numberOfQuestions = this.questionGroup.questions.length;
          this.setStep(0);
        });

      this.topicsService
        .getAll()
        .toPromise()
        .then(topics => {
          this.topics = topics;
          this.ref.detectChanges();
        });
    }
  }

  ngOnDestroy() {
    this.ref.detach();
  }

  setStep(newStep: number) {
    this.step = newStep;
    if (!this.id) {
      return;
    }
    this.ref.detectChanges();
  }

  receiveMessageFromContent(data: any) {
    const { action, value } = data;

    switch (action) {
      case "content-topic-select":
        this.questionGroup.topicIds = value.map(t => t.id);
        this.questionGroupsService.update(this.questionGroup);
        this.selectedTopicIds = this.questionGroup.topicIds;
        this.ref.detectChanges();
        break;
    }
  }
}
