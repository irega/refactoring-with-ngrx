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
  answerToAddText = '';

  addAnswer(keyCode: number): void {
    if (keyCode !== 13) {
      return;
    }

    this.add.emit({ text: this.answerToAddText });
    this.answerToAddText = '';
  }
}
