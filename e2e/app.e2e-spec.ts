import { ToothlabV3Page } from './app.po';

describe('toothlab-v3 App', () => {
  let page: ToothlabV3Page;

  beforeEach(() => {
    page = new ToothlabV3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
