import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { CustomModalService } from "src/app/components/custom-modal/custom-modal.service";
import { QuestionGroupBaseComponent } from "../../question-group-base.component";

@Component({
  selector: "app-question-group-questions",
  templateUrl: "./question-group-questions.component.html"
})
export class QuestionGroupQuestionsComponent extends QuestionGroupBaseComponent {
  @Output() messageEventFromQuestions = new EventEmitter<any>();
  @Input() answers: Array<any>;

  constructor(
    private customModalService: CustomModalService,
    protected ref: ChangeDetectorRef
  ) {
    super(ref, "question");
    this.emitter = this.messageEventFromQuestions;
  }

  onDelete(elementId: number) {
    this.customModalService.show({
      title: "Delete a question",
      description: "Are you sure you want to delete this question?",
      ok: { text: "Yes" },
      cancel: { text: "No" }
    });
    const subscription = this.customModalService.stateChange.subscribe(
      params => {
        subscription.unsubscribe();
        if (params.confirmed) {
          this.messageEventFromQuestions.emit({
            action: "question-delete",
            value: questionId
          });
        }
      }
    );
  }

  toggleQuestion(questionId: number) {
    this.messageEventFromQuestions.emit({
      action: "question-toggle",
      value: questionId
    });
  }

  receiveMessageFromAnswers(event) {
    this.messageEventFromQuestions.emit(event);
  }
}
