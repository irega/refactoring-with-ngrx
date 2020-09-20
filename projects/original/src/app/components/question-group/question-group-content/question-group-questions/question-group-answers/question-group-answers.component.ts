import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-question-group-answers",
  templateUrl: "./question-group-answers.component.html"
})
export class QuestionGroupAnswersComponent {
  @Input() answers: Array<any>;
  @Output() add = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  public answerToAddText = "";

  addAnswer(keyCode: number): void {
    if (keyCode !== 13) {
      return;
    }

    this.add.emit(this.answerToAddText);
    this.answerToAddText = "";
  }

  updateAnswer(keyCode: number, answer: any, text: string): void {
    if (keyCode !== 13) {
      return;
    }
    const answerToUpdate = Object.assign({}, answer, { text });
    this.edit.emit(answerToUpdate);
  }

  deleteAnswer(answerId: number) {
    this.delete.emit(answerId);
  }
}
