import { Component, Inject } from '@angular/core';
import { AppSettings, APP_SETTINGS } from './app.config';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html'
})
export class AppComponent {
  apiUrl: string;

  constructor(@Inject(APP_SETTINGS) appSettings: AppSettings) {
    // INFO: This is only an example for how to read the application config from a component.
    this.apiUrl = appSettings.apiUrl;
  }
}
