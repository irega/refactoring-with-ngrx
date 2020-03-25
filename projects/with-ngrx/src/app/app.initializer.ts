import { SETTINGS, AppSettings } from './app.config';

export function initialize(): () => Promise<any> {
  return () => getSettings();
}

function getSettings(): Promise<any> {
  return fetch(new Request('./appsettings.json'))
    .then(response => response.json())
    .then((settings: AppSettings) => {
      SETTINGS.apiUrl = settings.apiUrl;
      return SETTINGS;
    });
}
