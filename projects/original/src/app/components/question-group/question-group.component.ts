import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { QuestionGroupsService } from "src/app/services/question-groups/question-groups.service";

@Component({
  selector: "app-question-group",
  templateUrl: "./question-group.component.html"
})
export class QuestionGroupComponent implements OnChanges {
  @Input() id: string;
  public questionGroup: any;
  public step: number;
  public numberOfQuestions: number;

  constructor(
    private ref: ChangeDetectorRef,
    private questionGroupsService: QuestionGroupsService
  ) {
    this.step = 0;
    this.questionGroup = {};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.id) {
      return;
    }
    if (changes.id.currentValue) {
      this.questionGroupsService
        .get(+this.id)
        .toPromise()
        .then(data => {
          this.questionGroup = data;
          this.numberOfQuestions = this.questionGroup.questions.length;
          this.setStep(0);
        });
    }
  }

  setStep(newStep: number) {
    this.step = newStep;
    if (!this.id) {
      return;
    }
    this.ref.detectChanges();
  }
}
