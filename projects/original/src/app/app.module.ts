import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { SafePipeModule } from "safe-pipe";
import { AppComponent } from "./app.component";
import { AnswersService } from "./services/answers/answers.service";
import { CustomModalService } from "./services/custom-modal/custom-modal.service";
import { FakeApiService } from "./services/fake-api/fake-api.service";
import { QuestionGroupsService } from "./services/question-groups/question-groups.service";
import { QuestionsService } from "./services/questions/questions.service";
import { TopicsService } from "./services/topics/topics.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SafePipeModule,
    ReactiveFormsModule,
    FormsModule,

    HttpClientInMemoryWebApiModule.forRoot(FakeApiService)
  ],
  providers: [
    QuestionsService,
    AnswersService,
    CustomModalService,
    QuestionGroupsService,
    TopicsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
