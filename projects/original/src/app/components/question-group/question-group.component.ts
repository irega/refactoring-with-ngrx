import { Component, Input } from "@angular/core";

@Component({
  selector: "app-question-group",
  templateUrl: "./question-group.component.html"
})
export class QuestionGroupComponent {
  @Input() id: string;
  @Input() questionGroups: Array<any>;
}
