import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): any {
    return browser.get(browser.baseUrl);
  }

  getParagraphText(): Promise<string> {
    return element(by.css('app-root h4')).getText() as Promise<string>;
  }

}
