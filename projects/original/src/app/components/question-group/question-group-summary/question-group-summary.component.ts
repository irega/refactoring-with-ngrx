import { Component, Input } from "@angular/core";

@Component({
  selector: "app-question-group-summary",
  templateUrl: "./question-group-summary.component.html"
})
export class QuestionGroupSummaryComponent {
  @Input() numberOfQuestions = 0;
}
