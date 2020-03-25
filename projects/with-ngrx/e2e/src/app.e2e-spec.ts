import { AppPage } from './app.po';

describe('The Questions Manager App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    // TODO: Implement test.
    expect(page.getParagraphText()).toEqual('');
  });
});
