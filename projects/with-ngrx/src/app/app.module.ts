import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SafePipeModule } from 'safe-pipe';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { initialize } from './app.initializer';
import { SETTINGS, APP_SETTINGS } from './app.config';
import { provideBootstrapEffects } from './app.bootstrap-effects';
import { COMPONENTS, PROVIDERS } from './app.barrel';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SafePipeModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(
      {},
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
    EffectsModule.forRoot([])
  ],
  providers: [
    ...PROVIDERS,
    { provide: APP_SETTINGS, useFactory: () => SETTINGS },
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      multi: true
    },
    provideBootstrapEffects([])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
