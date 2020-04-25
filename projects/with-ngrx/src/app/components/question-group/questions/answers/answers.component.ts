import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Answer } from 'src/app/state/answers/entities';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswersComponent {
  @Input() answers: Answer[];
}
