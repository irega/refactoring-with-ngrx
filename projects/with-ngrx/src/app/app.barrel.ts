/* tslint:disable */
import { AppComponent } from './app.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { ActionsMenuComponent } from './components/home-page/actions-menu/actions-menu.component';
import { HomePageComponent } from './components/home-page/home-page.component';

import { CustomModalService } from './services/custom-modal/custom-modal.service';
import { FakeApiService } from './services/fake-api/fake-api.service';
import { QuestionGroupsService } from './services/question-groups/question-groups.service';

export const COMPONENTS = [
  AppComponent,
  CustomModalComponent,
  HeaderComponent,
  ActionsMenuComponent,
  HomePageComponent
];
export const PIPES = [];
export const DIRECTIVES = [];
export const PROVIDERS = [CustomModalService, FakeApiService, QuestionGroupsService];
