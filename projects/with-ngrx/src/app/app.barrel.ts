/* tslint:disable */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';

import { FakeApiService } from './services/fakeApi.service';
import { QuestionGroupsService } from './services/questionGroups.service';

export const COMPONENTS = [AppComponent, HeaderComponent, HomePageComponent];
export const PIPES = [];
export const DIRECTIVES = [];
export const PROVIDERS = [FakeApiService, QuestionGroupsService];
