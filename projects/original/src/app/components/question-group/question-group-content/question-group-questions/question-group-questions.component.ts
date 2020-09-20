import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CustomModalService } from "src/app/components/custom-modal/custom-modal.service";

@Component({
  selector: "app-question-group-questions",
  templateUrl: "./question-group-questions.component.html"
})
export class QuestionGroupQuestionsComponent {
  @Output() messageEventFromQuestions = new EventEmitter<any>();
  @Input() questions: Array<any>;
  @Input() answers: Array<any>;
  public questionToAddText = "";

  constructor(private customModalService: CustomModalService) {}

  updateQuestion(keyCode: number, question: any, text: string): void {
    if (keyCode !== 13) {
      return;
    }
    const questionToUpdate = Object.assign({}, question, { text });
    this.messageEventFromQuestions.emit({
      action: "question-update",
      value: questionToUpdate
    });
  }

  addQuestion(keyCode: number): void {
    if (keyCode !== 13) {
      return;
    }

    this.messageEventFromQuestions.emit({
      action: "question-add",
      value: this.questionToAddText
    });
    this.questionToAddText = "";
  }

  deleteQuestion(questionId: number): void {
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

  addAnswer(answer) {
    this.messageEventFromQuestions.emit({
      action: "answer-add",
      value: answer
    });
  }

  editAnswer(answer) {
    this.messageEventFromQuestions.emit({
      action: "answer-update",
      value: answer
    });
  }

  deleteAnswer(answerId: number): void {
    this.messageEventFromQuestions.emit({
      action: "answer-delete",
      value: answerId
    });
  }
}
