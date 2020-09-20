import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output
} from "@angular/core";
import { QuestionGroupBaseComponent } from "../../../question-group-base.component";

@Component({
  selector: "app-question-group-answers",
  templateUrl: "./question-group-answers.component.html"
})
export class QuestionGroupAnswersComponent extends QuestionGroupBaseComponent {
  @Output() messageEventFromAnswers = new EventEmitter<any>();

  constructor(protected ref: ChangeDetectorRef) {
    super(ref, "answer");
    this.emitter = this.messageEventFromAnswers;
  }
}
