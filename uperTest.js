const { chromium } = require('@playwright/test');

class UperTest {
  userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36";
  // إعدادات المتصفح
  args = [
    "--disable-blink-features",
    "--disable-blink-features=AutomationControlled",
    "--disable-infobars",
    "--window-size=1920,1080",
    "--start-maximized",
  ];

  constructor(number) {
    const proxy = {
      server: "as.2a5c7a83de539ea5.abcproxy.vip:4950",
      username: "Bwrka67HY5-zone-star-region-nl",
      password: "72237663",
    };
    this.number = number;
    this.args.push(`--user-agent="${this.userAgent}"`);
    this.args.push("--disable-web-security");
    this.options = {
      headless: false,
      args: this.args,
      ignoreDefaultArgs: ["--mute-audio", "--hide-scrollbars"],
      ignoreHTTPSErrors: true,
      bypassCSP: true,
      proxy: proxy,
      timeout: 0,
    };
  }

  async run() {
    let browser;
    try {
      browser = await chromium.launch(this.options);
      const context = await browser.newContext();
      const page = await context.newPage();
      
      console.log(`Starting test for number: ${this.number}`);
      
      await page.goto('https://auth.uber.com/v2/', { waitUntil: 'domcontentloaded' });
      await page.fill('#PHONE_NUMBER_or_EMAIL_ADDRESS', this.number);
      await page.click('#forward-button');
      
      // Wait for response or timeout
      await page.waitForTimeout(10000);
      
      console.log(`Completed test for number: ${this.number}`);
    } catch (error) {
      console.error(`Error testing number ${this.number}:`, error);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}

module.exports = UperTest; 