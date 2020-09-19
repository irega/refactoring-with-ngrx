import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { CustomModalService } from "./components/custom-modal/custom-modal.service";
import { QuestionGroupsService } from "./services/question-groups/question-groups.service";

@Component({
  selector: "app-component",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy {
  public step: number;
  public apiUrl: string;
  public questionGroups: Array<any>;
  public action: string;
  public questionGroupId: string;

  constructor(
    private ref: ChangeDetectorRef,
    private questionGroupsService: QuestionGroupsService,
    private customModalService: CustomModalService
  ) {
    this.step = 0;

    // INFO: This is only an example for how to read the application config from a component.
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.getQuestionGroups();
  }

  ngOnDestroy() {
    this.ref.detach();
  }

  goToStep(step: number) {
    this.step = step;
    this.ref.detectChanges();
  }

  private getQuestionGroups() {
    this.questionGroupsService
      .getAll()
      .toPromise()
      .then(questionGroups => {
        this.questionGroups = questionGroups;
        this.ref.detectChanges();
      });
  }

  receiveMessageFromHome(data: any) {
    this.action = data.action;
    if (this.action === "new") {
      this.customModalService.show({
        title: "Create new question group",
        description: "Choose a name for the new question group",
        createEdit: true,
        labelInputText: { text: "Name" },
        ok: { text: "Create" },
        cancel: { text: "Cancel" }
      });
      const subscription = this.customModalService.stateChange.subscribe(
        ({ confirmed, title }) => {
          subscription.unsubscribe();
          if (!confirmed) {
            return;
          }
          this.questionGroupsService
            .create({ id: null, name: title })
            .toPromise()
            .then(
              questionGroup => {
                console.log("Created new question group", questionGroup.id);
                this.getQuestionGroups();
              },
              error => {
                console.error(error);
              }
            );
        }
      );
    } else if (this.action === "edit") {
      this.customModalService.show({
        title: data.value.name,
        description: "Modify the name of this question group",
        createEdit: true,
        labelInputText: { text: "Name" },
        ok: { text: "Edit" },
        cancel: { text: "Cancel" }
      });
      const subscription = this.customModalService.stateChange.subscribe(
        ({ confirmed, title }) => {
          subscription.unsubscribe();
          if (!confirmed) {
            return;
          }
          this.questionGroupsService
            .update(Object.assign({}, data.value, { name: title }))
            .toPromise()
            .then(
              () => this.getQuestionGroups(),
              error => {
                console.error(error);
              }
            );
        }
      );
    } else if (this.action === "delete") {
      this.customModalService.show({
        title: "Delete a question group",
        description: "Are you sure you want to delete this question group?",
        ok: { text: "Yes" },
        cancel: { text: "No" }
      });
      const subscription = this.customModalService.stateChange.subscribe(
        ({ confirmed }) => {
          subscription.unsubscribe();
          if (!confirmed) {
            return;
          }
          this.questionGroupsService
            .delete(data.value)
            .toPromise()
            .then(
              () => this.getQuestionGroups(),
              error => {
                console.error(error);
              }
            );
        }
      );
    } else if (this.action === "view") {
      this.goToQuestionGroup(data.value);
    }

    this.ref.detectChanges();
  }

  goToQuestionGroup(id: string) {
    this.questionGroupId = id;
    this.goToStep(1);
  }

  receiveMessageFromHeader(value: any) {
    const { action } = value;
    if (action === "goBack") {
      this.goToStep(0);
    }
  }
}
