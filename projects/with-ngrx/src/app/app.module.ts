import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SafePipeModule } from 'safe-pipe';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { COMPONENTS, PROVIDERS } from './app.barrel';
import { provideBootstrapEffects } from './app.bootstrap-effects';
import { AppComponent } from './app.component';
import { APP_SETTINGS, SETTINGS } from './app.config';
import { initialize } from './app.initializer';
import { FakeApiService } from './services/fake-api/fake-api.service';
import { AnswersEffects } from './state/answers/effects/answers-effects.service';
import { answersReducer } from './state/answers/reducers';
import { currentQuestionGroupReducer } from './state/currentQuestionGroup/reducers';
import { loaderReducer } from './state/loader/reducers';
import { QuestionGroupsEffects } from './state/questionGroups/effects/questionGroups-effects.service';
import { questionGroupsReducer } from './state/questionGroups/reducers';
import { QuestionsEffects } from './state/questions/effects/questions-effects.service';
import { questionsReducer } from './state/questions/reducers';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SafePipeModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        questionGroups: questionGroupsReducer,
        questions: questionsReducer,
        currentQuestionGroup: currentQuestionGroupReducer,
        answers: answersReducer,
        loader: loaderReducer
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    HttpClientInMemoryWebApiModule.forRoot(FakeApiService)
  ],
  providers: [
    ...PROVIDERS,
    { provide: APP_SETTINGS, useFactory: () => SETTINGS },
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      multi: true
    },
    provideBootstrapEffects([QuestionGroupsEffects, QuestionsEffects, AnswersEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
