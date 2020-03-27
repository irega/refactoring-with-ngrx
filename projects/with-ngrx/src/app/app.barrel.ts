/* tslint:disable */
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';

import { FakeApiService } from './services/fakeApi.service';
import { QuestionGroupsService } from './services/questionGroups.service';

export const COMPONENTS = [AppComponent, HomePageComponent];
export const PIPES = [];
export const DIRECTIVES = [];
export const PROVIDERS = [FakeApiService, QuestionGroupsService];
