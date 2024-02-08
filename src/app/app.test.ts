import 'expect-puppeteer';
import puppeteer, { Page, Browser } from 'puppeteer';

describe('Basic tests', () => {
  let browser: Browser;
  let page: Page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
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
