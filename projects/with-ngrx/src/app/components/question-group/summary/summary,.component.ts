import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent {
  @Input() totalQuestions = 0;
  @Input() totalAnswers = 0;
}
