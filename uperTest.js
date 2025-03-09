const { chromium, devices } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

class UperTest {
  // Get all available device names from Playwright's devices list
  deviceNames = Object.keys(devices);

  // Country code mapping (phone prefix to ISO code)
  countryCodeMap = {
    // Africa
    '20': 'eg', // Egypt
    '211': 'ss', // South Sudan
    '212': 'ma', // Morocco
    '213': 'dz', // Algeria
    '216': 'tn', // Tunisia
    '218': 'ly', // Libya
    '220': 'gm', // Gambia
    '221': 'sn', // Senegal
    '222': 'mr', // Mauritania
    '223': 'ml', // Mali
    '224': 'gn', // Guinea
    '225': 'ci', // Côte d'Ivoire
    '226': 'bf', // Burkina Faso
    '227': 'ne', // Niger
    '228': 'tg', // Togo
    '229': 'bj', // Benin
    '230': 'mu', // Mauritius
    '231': 'lr', // Liberia
    '232': 'sl', // Sierra Leone
    '233': 'gh', // Ghana
    '234': 'ng', // Nigeria
    '235': 'td', // Chad
    '236': 'cf', // Central African Republic
    '237': 'cm', // Cameroon
    '238': 'cv', // Cape Verde
    '239': 'st', // São Tomé and Príncipe
    '240': 'gq', // Equatorial Guinea
    '241': 'ga', // Gabon
    '242': 'cg', // Republic of the Congo
    '243': 'cd', // Democratic Republic of the Congo
    '244': 'ao', // Angola
    '245': 'gw', // Guinea-Bissau
    '246': 'io', // British Indian Ocean Territory
    '247': 'ac', // Ascension Island
    '248': 'sc', // Seychelles
    '249': 'sd', // Sudan
    '250': 'rw', // Rwanda
    '251': 'et', // Ethiopia
    '252': 'so', // Somalia
    '253': 'dj', // Djibouti
    '254': 'ke', // Kenya
    '255': 'tz', // Tanzania
    '256': 'ug', // Uganda
    '257': 'bi', // Burundi
    '258': 'mz', // Mozambique
    '260': 'zm', // Zambia
    '261': 'mg', // Madagascar
    '262': 're', // Réunion
    '263': 'zw', // Zimbabwe
    '264': 'na', // Namibia
    '265': 'mw', // Malawi
    '266': 'ls', // Lesotho
    '267': 'bw', // Botswana
    '268': 'sz', // Eswatini
    '269': 'km', // Comoros
    '27': 'za',  // South Africa
    '290': 'sh', // Saint Helena
    '291': 'er', // Eritrea
    '297': 'aw', // Aruba
    '298': 'fo', // Faroe Islands
    '299': 'gl', // Greenland
    
    // Europe
    '30': 'gr',  // Greece
    '31': 'nl',  // Netherlands
    '32': 'be',  // Belgium
    '33': 'fr',  // France
    '34': 'es',  // Spain
    '350': 'gi', // Gibraltar
    '351': 'pt', // Portugal
    '352': 'lu', // Luxembourg
    '353': 'ie', // Ireland
    '354': 'is', // Iceland
    '355': 'al', // Albania
    '356': 'mt', // Malta
    '357': 'cy', // Cyprus
    '358': 'fi', // Finland
    '359': 'bg', // Bulgaria
    '36': 'hu',  // Hungary
    '370': 'lt', // Lithuania
    '371': 'lv', // Latvia
    '372': 'ee', // Estonia
    '373': 'md', // Moldova
    '374': 'am', // Armenia
    '375': 'by', // Belarus
    '376': 'ad', // Andorra
    '377': 'mc', // Monaco
    '378': 'sm', // San Marino
    '379': 'va', // Vatican City
    '380': 'ua', // Ukraine
    '381': 'rs', // Serbia
    '382': 'me', // Montenegro
    '383': 'xk', // Kosovo
    '385': 'hr', // Croatia
    '386': 'si', // Slovenia
    '387': 'ba', // Bosnia and Herzegovina
    '389': 'mk', // North Macedonia
    '39': 'it',  // Italy
    '40': 'ro',  // Romania
    '41': 'ch',  // Switzerland
    '420': 'cz', // Czech Republic
    '421': 'sk', // Slovakia
    '423': 'li', // Liechtenstein
    '43': 'at',  // Austria
    '44': 'gb',  // United Kingdom
    '45': 'dk',  // Denmark
    '46': 'se',  // Sweden
    '47': 'no',  // Norway
    '48': 'pl',  // Poland
    '49': 'de',  // Germany
    
    // North America
    '1': 'us',   // United States/Canada
    
    // Asia
    '60': 'my',  // Malaysia
    '61': 'au',  // Australia
    '62': 'id',  // Indonesia
    '63': 'ph',  // Philippines
    '64': 'nz',  // New Zealand
    '65': 'sg',  // Singapore
    '66': 'th',  // Thailand
    '673': 'bn', // Brunei
    '674': 'nr', // Nauru
    '675': 'pg', // Papua New Guinea
    '676': 'to', // Tonga
    '677': 'sb', // Solomon Islands
    '678': 'vu', // Vanuatu
    '679': 'fj', // Fiji
    '680': 'pw', // Palau
    '681': 'wf', // Wallis and Futuna
    '682': 'ck', // Cook Islands
    '683': 'nu', // Niue
    '685': 'ws', // Samoa
    '686': 'ki', // Kiribati
    '687': 'nc', // New Caledonia
    '688': 'tv', // Tuvalu
    '689': 'pf', // French Polynesia
    '690': 'tk', // Tokelau
    '691': 'fm', // Micronesia
    '692': 'mh', // Marshall Islands
    '7': 'ru',   // Russia/Kazakhstan
    '81': 'jp',  // Japan
    '82': 'kr',  // South Korea
    '84': 'vn',  // Vietnam
    '86': 'cn',  // China
    '90': 'tr',  // Turkey
    '91': 'in',  // India
    '92': 'pk',  // Pakistan
    '93': 'af',  // Afghanistan
    '94': 'lk',  // Sri Lanka
    '95': 'mm',  // Myanmar
    '960': 'mv', // Maldives
    '961': 'lb', // Lebanon
    '962': 'jo', // Jordan
    '963': 'sy', // Syria
    '964': 'iq', // Iraq
    '965': 'kw', // Kuwait
    '966': 'sa', // Saudi Arabia
    '967': 'ye', // Yemen
    '968': 'om', // Oman
    '970': 'ps', // Palestine
    '971': 'ae', // United Arab Emirates
    '972': 'il', // Israel
    '973': 'bh', // Bahrain
    '974': 'qa', // Qatar
    '975': 'bt', // Bhutan
    '976': 'mn', // Mongolia
    '977': 'np', // Nepal
    '98': 'ir',  // Iran
    '992': 'tj', // Tajikistan
    '993': 'tm', // Turkmenistan
    '994': 'az', // Azerbaijan
    '995': 'ge', // Georgia
    '996': 'kg', // Kyrgyzstan
    '998': 'uz', // Uzbekistan
    
    // South America
    '51': 'pe',  // Peru
    '52': 'mx',  // Mexico
    '53': 'cu',  // Cuba
    '54': 'ar',  // Argentina
    '55': 'br',  // Brazil
    '56': 'cl',  // Chile
    '57': 'co',  // Colombia
    '58': 've',  // Venezuela
    '591': 'bo', // Bolivia
    '592': 'gy', // Guyana
    '593': 'ec', // Ecuador
    '595': 'py', // Paraguay
    '597': 'sr', // Suriname
    '598': 'uy', // Uruguay
    
    // Default
    'default': 'us'
  };

  // List of common user agents to rotate
  userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  ];

  constructor(number) {
    this.number = number;
    
    // Extract the country code and local number
    let countryCode = 'us'; // Default
    let localNumber = number;
    
    // Find the longest matching prefix
    let longestMatch = '';
    for (const prefix in this.countryCodeMap) {
      if (number.startsWith(prefix) && prefix.length > longestMatch.length) {
        longestMatch = prefix;
        countryCode = this.countryCodeMap[prefix];
        localNumber = number.substring(prefix.length); // Remove country code from number
      }
    }
    
    this.countryPrefix = longestMatch;
    this.localNumber = localNumber;
    
    // Select a random device from Playwright's device list
    this.deviceName = this.deviceNames[Math.floor(Math.random() * this.deviceNames.length)];
    this.device = devices[this.deviceName];
    
    // Select a random user agent
    this.userAgent = this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
    
    // Proxy configuration with dynamic country code
    this.proxy = {
      server: "as.2a5c7a83de539ea5.abcproxy.vip:4950",
      username: `Bwrka67HY5-zone-star-region-${countryCode}`,
      password: "72237663",
    };

    console.log(`Selected device for ${number}: ${this.deviceName}`);
    console.log(`Selected user agent: ${this.userAgent}`);
    console.log(`Country code detected: ${longestMatch} -> ${countryCode}`);
    console.log(`Local number (without country code): ${localNumber}`);
    console.log(`Proxy for ${number}: ${this.proxy.server} (${this.proxy.username})`);

    // Browser launch arguments to disable automation detection
    this.launchArgs = [
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-site-isolation-trials',
      '--disable-web-security',
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--disable-webgl',
      '--disable-threaded-animation',
      '--disable-threaded-scrolling',
      '--disable-in-process-stack-traces',
      '--disable-histogram-customizer',
      '--disable-gl-extensions',
      '--disable-composited-antialiasing',
      '--disable-canvas-aa',
      '--disable-3d-apis',
      '--disable-accelerated-2d-canvas',
      '--disable-accelerated-jpeg-decoding',
      '--disable-accelerated-mjpeg-decode',
      '--disable-app-list-dismiss-on-blur',
      '--disable-accelerated-video-decode',
      '--disable-dev-shm-usage',
      '--ignore-certificate-errors',
      '--window-size=1920,1080',
      '--start-maximized',
      '--hide-scrollbars',
      '--mute-audio',
      '--disable-infobars',
      '--disable-notifications',
      '--disable-extensions',
      '--disable-popup-blocking',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-breakpad',
      '--disable-component-extensions-with-background-pages',
      '--disable-features=TranslateUI,BlinkGenPropertyTrees',
      '--disable-ipc-flooding-protection',
      '--enable-features=NetworkService,NetworkServiceInProcess',
      '--force-color-profile=srgb',
      '--metrics-recording-only',
    ];

    // Browser options
    this.options = {
      headless: false,
      args: this.launchArgs,
      ignoreDefaultArgs: ['--enable-automation'],
      ignoreHTTPSErrors: true,
      bypassCSP: true,
      proxy: this.proxy,
    };
    
    // Create a unique session ID for this run
    this.sessionId = Math.random().toString(36).substring(2, 15);
  }

  // Generate random delay between actions to mimic human behavior
  async randomDelay(min = 500, max = 2000) {
    const delay = Math.floor(Math.random() * (max - min)) + min;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // Simulate human-like typing
  async humanType(page, selector, text) {
    await page.focus(selector);
    
    // Type with random delays between keystrokes
    for (const char of text) {
      await page.keyboard.type(char);
      await this.randomDelay(50, 150);
    }
  }

  // Simulate human-like mouse movement
  async humanMove(page, selector) {
    // Get the bounding box of the element
    const elementHandle = await page.$(selector);
    const box = await elementHandle.boundingBox();
    
    // Start from a random position on the page
    const startX = Math.random() * page.viewportSize().width;
    const startY = Math.random() * page.viewportSize().height;
    
    // Calculate target position (slightly randomized within the element)
    const targetX = box.x + box.width * (0.1 + Math.random() * 0.8);
    const targetY = box.y + box.height * (0.1 + Math.random() * 0.8);
    
    // Move mouse in multiple steps with slight randomization
    const steps = 10 + Math.floor(Math.random() * 10);
    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      // Add some randomness to the path
      const randomOffsetX = Math.random() * 10 - 5;
      const randomOffsetY = Math.random() * 10 - 5;
      
      const currentX = startX + (targetX - startX) * progress + randomOffsetX;
      const currentY = startY + (targetY - startY) * progress + randomOffsetY;
      
      await page.mouse.move(currentX, currentY);
      await this.randomDelay(10, 30);
    }
    
    // Final precise movement to the target
    await page.mouse.move(targetX, targetY);
  }

  // Create and manage browser fingerprint
  async setupFingerprint(context) {
    // Override permissions
    await context.grantPermissions(['geolocation'], { origin: 'https://auth.uber.com' });
    
    // Set cookies from previous session if available
    try {
      const cookiesPath = path.join(__dirname, `cookies_${this.sessionId}.json`);
      if (fs.existsSync(cookiesPath)) {
        const cookiesString = fs.readFileSync(cookiesPath);
        const cookies = JSON.parse(cookiesString);
        await context.addCookies(cookies);
        console.log(`Loaded cookies for session ${this.sessionId}`);
      }
    } catch (error) {
      console.log('No previous cookies found, starting fresh session');
    }
    
    // Override JavaScript properties that reveal automation
    await context.addInitScript(() => {
      // Override navigator properties
      const newProto = navigator.__proto__;
      delete newProto.webdriver;
      
      // Override permissions
      navigator.permissions.query = (parameters) => {
        return Promise.resolve({ state: 'granted', onchange: null });
      };
      
      // Override plugins
      Object.defineProperty(navigator, 'plugins', {
        get: () => {
          return [
            {
              0: {
                type: 'application/pdf',
                suffixes: 'pdf',
                description: 'Portable Document Format',
                enabledPlugin: Plugin,
              },
              name: 'PDF Viewer',
              description: 'Portable Document Format',
              filename: 'internal-pdf-viewer',
              length: 1,
            }
          ];
        },
      });
      
      // Override languages
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
      });
      
      // Override hardware concurrency
      Object.defineProperty(navigator, 'hardwareConcurrency', {
        get: () => 8,
      });
      
      // Override connection
      Object.defineProperty(navigator, 'connection', {
        get: () => {
          return {
            rtt: 100,
            downlink: 10,
            effectiveType: '4g',
          };
        },
      });
      
      // Override Chrome
      window.chrome = {
        runtime: {},
        loadTimes: function() {},
        csi: function() {},
        app: {},
      };
      
      // Override iframe contentWindow access
      const originalGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      Object.getOwnPropertyDescriptor = function(obj, prop) {
        if (prop === 'contentWindow' && obj && obj.tagName && obj.tagName.toLowerCase() === 'iframe') {
          return { configurable: true, enumerable: true, get: function() { return window; } };
        }
        return originalGetOwnPropertyDescriptor(obj, prop);
      };
      
      // Override toString methods to hide proxy functions
      const originalToString = Function.prototype.toString;
      Function.prototype.toString = function() {
        if (this === Function.prototype.toString) return originalToString.call(this);
        if (this === navigator.permissions.query) return 'function query() { [native code] }';
        return originalToString.call(this);
      };
    });
  }

  async run() {
    let browser;
    try {
      browser = await chromium.launch(this.options);
      
      // Create a context with the selected device
      const context = await browser.newContext({
        ...this.device,
        userAgent: this.userAgent,
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
        hasTouch: this.device.hasTouch || false,
        locale: 'en-US',
        timezoneId: 'America/New_York',
        geolocation: { longitude: -74 + Math.random(), latitude: 40 + Math.random() },
        permissions: ['geolocation'],
        colorScheme: 'light',
        reducedMotion: 'no-preference',
        forcedColors: 'none',
        acceptDownloads: true,
        defaultBrowserType: 'chromium',
        isMobile: this.device.isMobile || false,
        javaScriptEnabled: true,
      });
      
      // Setup fingerprint spoofing
      await this.setupFingerprint(context);
      
      const page = await context.newPage();
      
      console.log(`Starting test for number: ${this.number}`);
      console.log(`Device: ${this.deviceName}`);
      
      // Add event listeners to intercept and modify certain requests
      await page.route('**/*', async (route) => {
        const request = route.request();
        
        // Modify headers to appear more like a real browser
        const headers = request.headers();
        headers['Accept-Language'] = 'en-US,en;q=0.9';
        headers['sec-ch-ua'] = '"Google Chrome";v="120", "Chromium";v="120", "Not=A?Brand";v="99"';
        headers['sec-ch-ua-mobile'] = this.device.isMobile ? '?1' : '?0';
        headers['sec-ch-ua-platform'] = this.device.isMobile ? '"Android"' : '"Windows"';
        
        // Continue with modified headers
        await route.continue({ headers });
      });
      
      // Random scrolling and mouse movements before navigating
      await this.randomDelay(1000, 3000);
      
      // Now navigate to the actual test page with randomized timing
      await page.goto('https://auth.uber.com/v2/', { 
        waitUntil: 'domcontentloaded',
        timeout: 50000
      });
      
      // Simulate human browsing behavior - random scrolling
      await this.randomDelay(1000, 2000);
      await page.mouse.wheel(0, Math.random() * 100);
      await this.randomDelay(500, 1500);
      
      // Move mouse like a human to the input field
      await this.humanMove(page, '#PHONE_NUMBER_or_EMAIL_ADDRESS');
      await this.randomDelay(300, 800);
      
      // Type like a human - using local number without country code
      await this.humanType(page, '#PHONE_NUMBER_or_EMAIL_ADDRESS', this.localNumber);
      
      // Random delay before clicking
      await this.randomDelay(800, 1500);
      
      // Move mouse like a human to the button
      await this.humanMove(page, '#forward-button');
      await this.randomDelay(200, 500);
      
      // Click with a slight delay
      await page.mouse.down();
      await this.randomDelay(50, 150);
      await page.mouse.up();
      
      // Wait for page to navigate to the next page with randomized timing
      await this.randomDelay(7000, 15000);
      
      // Save cookies for future sessions
      const cookies = await context.cookies();
      const cookiesPath = path.join(__dirname, `cookies_${this.sessionId}.json`);
      fs.writeFileSync(cookiesPath, JSON.stringify(cookies));
      
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