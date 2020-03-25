import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    // TODO: Implement test.
    return element(by.css('')).getText();
  }
}
