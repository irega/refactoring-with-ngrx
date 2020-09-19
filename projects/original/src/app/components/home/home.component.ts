import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit, OnDestroy {
  @Output() messageEventFromHome = new EventEmitter<any>();

  @Input() questionGroups: Array<any>;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    console.log("Home initialized");
  }

  ngOnDestroy() {
    console.log("Home destroyed");
    this.ref.detach();
  }

  onNewQuestionGroupClicked() {
    this.messageEventFromHome.emit({
      action: "new"
    });
  }

  onEditQuestionGroupClicked(questionGroup) {
    if (!questionGroup) {
      return;
    }
    this.messageEventFromHome.emit({
      action: "edit",
      value: questionGroup
    });
  }

  onDeleteQuestionGroupClicked(id: string) {
    if (!id) {
      return;
    }
    this.messageEventFromHome.emit({
      action: "delete",
      value: id
    });
  }

  onQuestionGroupClicked(id: string) {
    if (!id) {
      return;
    }
    this.messageEventFromHome.emit({
      action: "view",
      value: id
    });
  }
}
