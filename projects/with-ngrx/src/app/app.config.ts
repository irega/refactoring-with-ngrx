import { InjectionToken } from '@angular/core';

export interface AppSettings {
  apiUrl: string;
}

export const SETTINGS: AppSettings = {
  apiUrl: ''
};

export let APP_SETTINGS = new InjectionToken<AppSettings>('app.settings');
