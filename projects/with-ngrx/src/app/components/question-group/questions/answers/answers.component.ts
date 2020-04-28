import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Answer } from 'src/app/state/answers/entities';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswersComponent {
  @Input() answers: Answer[];
  @Output() add = new EventEmitter<{ text: string }>();
  @Output() edit = new EventEmitter<Answer>();
  @Output() delete = new EventEmitter<number>();
  answerToAddText = '';

  addAnswer(keyCode: number): void {
    if (keyCode !== 13) {
      return;
    }

    this.add.emit({ text: this.answerToAddText });
    this.answerToAddText = '';
  }

  updateAnswer(keyCode: number, answer: Answer, text: string): void {
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
