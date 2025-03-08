const { chromium, devices } = require('@playwright/test');

class UperTest {
  // Get all available device names from Playwright's devices list
  deviceNames = Object.keys(devices);

  constructor(number) {
    this.number = number;
    
    // Select a random device from Playwright's device list
    this.deviceName = this.deviceNames[Math.floor(Math.random() * this.deviceNames.length)];
    this.device = devices[this.deviceName];
    
    console.log(`Selected device for ${number}: ${this.deviceName}`);
    
    // Proxy configuration
    const proxy = {
      server: "as.2a5c7a83de539ea5.abcproxy.vip:4950",
      username: "Bwrka67HY5-zone-star-region-nl",
      password: "72237663",
    };

    // Browser options
    this.options = {
      headless: false,
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
      
      // Create a context with the selected device
      const context = await browser.newContext({
        ...this.device,
        locale: ['en-US', 'en-GB', 'fr-FR', 'de-DE'][Math.floor(Math.random() * 4)],
        timezoneId: ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'][Math.floor(Math.random() * 4)],
        geolocation: {
          latitude: 40 + (Math.random() * 10 - 5),
          longitude: -74 + (Math.random() * 10 - 5)
        },
        permissions: ['geolocation']
      });
      
      const page = await context.newPage();
      
      console.log(`Starting test for number: ${this.number} with device: ${this.deviceName}`);
      
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