import { InjectionToken } from '@angular/core';

export interface AppSettings {
  apiUrl: string;
}

export const SETTINGS: AppSettings = {
  apiUrl: 'http://localhost:8080/api'
};

export let APP_SETTINGS = new InjectionToken<AppSettings>('app.settings');
