import { AppPage } from './app.po';

describe('The Questions Manager App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Questions Manager');
  });
});
