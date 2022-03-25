import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('App home', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display page title', async () => {
    await page.navigateTo();
    expect(await page.getParagraphText()).toEqual('Home');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
