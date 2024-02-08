import 'expect-puppeteer';
import puppeteer, { Page, Browser } from 'puppeteer';

describe('Basic authentication e2e tests', () => {
  let browser: Browser;
  let page: Page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
    });
    page = await browser.newPage();

    await page.goto('http://localhost:4200');
  });

  it('Check title', async () => {
    expect(await page.title()).toBe('Title');
  });

  afterAll(() => {
    browser.close();
  });
});

// (async () => {
//   // Launch the browser and open a new blank page
//   // const browser = await puppeteer.launch();

//
//   // Navigate the page to a URL
//   await page.goto('http://localhost:4200/');
//
//   // Set screen size
//   await page.setViewport({ width: 1360, height: 1024 });
//
//   await page.waitForSelector(getTestIdQuery(LoginTestEnum.Email));
//   await page.type(getTestIdQuery(LoginTestEnum.Email), 'Americo.Carter47@gmail.com');
//   await page.waitForSelector(getTestIdQuery(LoginTestEnum.Password));
//   await page.type(getTestIdQuery(LoginTestEnum.Email), 'jAdlctrLMGO6tfe');
//
//
//   // await page.click(searchResultSelector);
//   //
//   // // Locate the full title with a unique string
//   // const textSelector = await page.waitForSelector('text/Customize and automate');
//   // const fullTitle = await textSelector?.evaluate((el) => el.textContent);
//   //
//   // // Print the full title
//   // console.log('T2323 is "%s".', fullTitle);
//
//   await browser.close();
// })();
