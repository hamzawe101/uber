const { chromium, devices } = require('@playwright/test');

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

  constructor(number) {
    this.number = number;
    
    // Select a random device from Playwright's device list
    this.deviceName = this.deviceNames[Math.floor(Math.random() * this.deviceNames.length)];
    this.device = devices[this.deviceName];
    
    // Determine country code from phone number
    let countryCode = 'us'; // Default
    
    // Find the longest matching prefix
    let longestMatch = '';
    for (const prefix in this.countryCodeMap) {
      if (number.startsWith(prefix) && prefix.length > longestMatch.length) {
        longestMatch = prefix;
        countryCode = this.countryCodeMap[prefix];
      }
    }
    
    // Proxy configuration with dynamic country code
    this.proxy = {
      server: "as.2a5c7a83de539ea5.abcproxy.vip:4950",
      username: `Bwrka67HY5-zone-star-region-${countryCode}`,
      password: "72237663",
    };

    console.log(`Selected device for ${number}: ${this.deviceName}`);
    console.log(`Country code detected: ${longestMatch} -> ${countryCode}`);
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
  }

  async run() {
    let browser;
    try {
      browser = await chromium.launch(this.options);
      
      // Create a context with the selected device
      const context = await browser.newContext({
        ...this.device
      });
      
      const page = await context.newPage();
      
      console.log(`Starting test for number: ${this.number}`);
      console.log(`Device: ${this.deviceName}`);
      
      // Check IP address
      // await page.goto('https://api.ipify.org?format=json', { waitUntil: 'networkidle' });
      // const ipContent = await page.content();
      // const ipMatch = ipContent.match(/"ip":"([^"]+)"/);
      // const ip = ipMatch ? ipMatch[1] : 'Unknown';
      // console.log(`Browser IP address for ${this.number}: ${ip} (${this.proxy.username})`);
      
      // Now navigate to the actual test page
      await page.goto('https://auth.uber.com/v2/', { 
        waitUntil: 'domcontentloaded',
        timeout: 50000
      });
      
      // Wait a bit before filling in the form (more human-like)
      await page.waitForTimeout(Math.floor(Math.random() * 200) + 500);
      
      await page.fill('#PHONE_NUMBER_or_EMAIL_ADDRESS', this.number);
      
      // Wait a bit before clicking (more human-like)
      await page.waitForTimeout(Math.floor(Math.random() * 200) + 500);
      
      await page.click('#forward-button');
      
      // Wait for page to navigate to the next page
      await page.waitForTimeout(Math.floor(Math.random() * 8000) + 7000);
      
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