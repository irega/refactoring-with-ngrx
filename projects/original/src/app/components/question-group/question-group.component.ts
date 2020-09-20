import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from "@angular/core";
import { AnswersService } from "src/app/services/answers/answers.service";
import { QuestionGroupsService } from "src/app/services/question-groups/question-groups.service";
import { QuestionsService } from "src/app/services/questions/questions.service";
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
  private openedQuestionId: number;

  constructor(
    private ref: ChangeDetectorRef,
    private questionGroupsService: QuestionGroupsService,
    private topicsService: TopicsService,
    private questionsService: QuestionsService,
    private answersService: AnswersService
  ) {
    this.step = 0;
    this.questionGroup = {};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.id) {
      return;
    }
    if (changes.id.currentValue) {
      this.getQuestionGroup().then(() => this.setStep(0));

      this.topicsService
        .getAll()
        .toPromise()
        .then(topics => {
          this.topics = topics;
          this.ref.detectChanges();
        });
    }
  }

  private getQuestionGroup() {
    return this.questionGroupsService
      .get(+this.id)
      .toPromise()
      .then(data => {
        this.questionGroup = data;
        this.questions = this.questionGroup.questions.map(q => ({
          ...q,
          isOpened: q.id === +this.openedQuestionId
        }));
        this.selectedTopicIds = this.questionGroup.topicIds;
        this.numberOfQuestions = this.questionGroup.questions.length;
        this.ref.detectChanges();
      });
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
      case "content-question-add":
        this.questionsService
          .create({
            id: null,
            questionGroupId: this.id,
            text: value,
            isOpened: false
          })
          .toPromise()
          .then(() => this.getQuestionGroup());
        break;
      case "content-question-update":
        this.questionsService
          .update(value)
          .toPromise()
          .then(() => this.getQuestionGroup());
        break;
      case "content-question-delete":
        this.questionsService
          .delete(value)
          .toPromise()
          .then(() => this.getQuestionGroup());
        break;
      case "content-question-toggle":
        this.openedQuestionId = value;
        this.getAnswers(value).then(() => this.getQuestionGroup());
        break;
      case "content-answer-add":
        this.answersService
          .create({
            id: null,
            questionGroupId: this.id,
            questionId: this.openedQuestionId,
            text: value
          })
          .toPromise()
          .then(() =>
            this.getAnswers(this.openedQuestionId).then(() =>
              this.getQuestionGroup()
            )
          );
        break;
      case "content-answer-update":
        this.answersService
          .update(value)
          .toPromise()
          .then(() =>
            this.getAnswers(this.openedQuestionId).then(() =>
              this.getQuestionGroup()
            )
          );
        break;
      case "content-answer-delete":
        this.answersService
          .delete(value)
          .toPromise()
          .then(() =>
            this.getAnswers(this.openedQuestionId).then(() =>
              this.getQuestionGroup()
            )
          );
        break;
      case "content-topic-select":
        this.questionGroup.topicIds = value.map(t => t.id);
        this.questionGroupsService.update(this.questionGroup);
        this.selectedTopicIds = this.questionGroup.topicIds;
        this.ref.detectChanges();
        break;
    }
  }

  private getAnswers(questionId) {
    return this.answersService
      .getAll(+this.id, questionId)
      .toPromise()
      .then(answers => {
        this.answers = answers;
        this.ref.detectChanges();
      });
  }
}
