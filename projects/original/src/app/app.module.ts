import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { SafePipeModule } from "safe-pipe";
import { AppComponent } from "./app.component";
import { CustomModalComponent } from "./components/custom-modal/custom-modal.component";
import { CustomModalService } from "./components/custom-modal/custom-modal.service";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { QuestionGroupContentComponent } from "./components/question-group/question-group-content/question-group-content.component";
import { QuestionGroupAnswersComponent } from "./components/question-group/question-group-content/question-group-questions/question-group-answers/question-group-answers.component";
import { QuestionGroupQuestionsComponent } from "./components/question-group/question-group-content/question-group-questions/question-group-questions.component";
import { QuestionGroupTopicsComponent } from "./components/question-group/question-group-content/question-group-topics/question-group-topics.component";
import { QuestionGroupSummaryComponent } from "./components/question-group/question-group-summary/question-group-summary.component";
import { QuestionGroupComponent } from "./components/question-group/question-group.component";
import { AnswersService } from "./services/answers/answers.service";
import { FakeApiService } from "./services/fake-api/fake-api.service";
import { QuestionGroupsService } from "./services/question-groups/question-groups.service";
import { QuestionsService } from "./services/questions/questions.service";
import { TopicsService } from "./services/topics/topics.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CustomModalComponent,
    QuestionGroupComponent,
    QuestionGroupSummaryComponent,
    QuestionGroupContentComponent,
    QuestionGroupTopicsComponent,
    QuestionGroupQuestionsComponent,
    QuestionGroupAnswersComponent
  ],
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
