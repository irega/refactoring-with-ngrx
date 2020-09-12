/* tslint:disable */
import { AppComponent } from './app.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { ActionsMenuComponent } from './components/home-page/actions-menu/actions-menu.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ContentComponent } from './components/question-group/content/content.component';
import { AnswersComponent } from './components/question-group/content/questions/answers/answers.component';
import { QuestionsComponent } from './components/question-group/content/questions/questions.component';
import { SelectTopicsModalComponent } from './components/question-group/content/topics/select-topics-modal/select-topics-modal.component';
import { TopicsComponent } from './components/question-group/content/topics/topics.component';
import { QuestionGroupComponent } from './components/question-group/question-group.component';
import { SummaryComponent } from './components/question-group/summary/summary,.component';

import { AnswersService } from './services/answers/answers.service';
import { CustomModalService } from './services/custom-modal/custom-modal.service';
import { FakeApiService } from './services/fake-api/fake-api.service';
import { QuestionGroupsService } from './services/question-groups/question-groups.service';
import { QuestionsService } from './services/questions/questions.service';
import { TopicsService } from './services/topics/topics.service';

export const COMPONENTS = [
  AppComponent,
  CustomModalComponent,
  HeaderComponent,
  ActionsMenuComponent,
  HomePageComponent,
  LoaderComponent,
  ContentComponent,
  AnswersComponent,
  QuestionsComponent,
  SelectTopicsModalComponent,
  TopicsComponent,
  QuestionGroupComponent,
  SummaryComponent
];
export const PIPES = [];
export const DIRECTIVES = [];
export const PROVIDERS = [
  AnswersService,
  CustomModalService,
  FakeApiService,
  QuestionGroupsService,
  QuestionsService,
  TopicsService
];
