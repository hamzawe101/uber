const { chromium, devices } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

class UperTest {
  // قراءة ملف وصف الأجهزة
  deviceDescriptors = JSON.parse(fs.readFileSync(path.join(__dirname, 'deviceDescriptorsSource.json'), 'utf8'));
  
  // الحصول على قائمة أسماء الأجهزة من الملف
  deviceNames = Object.keys(this.deviceDescriptors);

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
    
    // اختيار جهاز عشوائي من ملف الأجهزة
    this.deviceName = this.deviceNames[Math.floor(Math.random() * this.deviceNames.length)];
    this.customDevice = this.deviceDescriptors[this.deviceName];
    
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

    // تقليل عدد الإعدادات للحصول على أداء أفضل
    this.launchArgs = [
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security',
      '--no-sandbox',
      '--disable-infobars',
      '--window-size=1920,1080',
    ];

    // Browser options
    this.options = {
      headless: false,
      args: this.launchArgs,
      ignoreDefaultArgs: ['--enable-automation'],
      ignoreHTTPSErrors: true,
      bypassCSP: true,
      proxy: this.proxy,
      timeout: 30000,
    };
  }

  async run() {
    let browser;
    try {
      browser = await chromium.launch(this.options);
      // random geolocation
      const randomGeolocation = {
        latitude: 33.5186 + (Math.random() * 10 - 5),
        longitude: -7.5926 + (Math.random() * 10 - 5)
      };
      // استخدام معلومات الجهاز من ملف JSON
      const context = await browser.newContext({
        userAgent: this.customDevice.userAgent,
        viewport: this.customDevice.viewport,
        deviceScaleFactor: this.customDevice.deviceScaleFactor,
        isMobile: this.customDevice.isMobile,
        hasTouch: this.customDevice.hasTouch,
        locale: 'en-US',
        timezoneId: 'Africa/Casablanca',
        geolocation: randomGeolocation
      });
      
      // إضافة سكريبت بسيط لتجنب الكشف
      await context.addInitScript(() => {
        // إخفاء خاصية webdriver
        Object.defineProperty(navigator, 'webdriver', {
          get: () => false,
          configurable: true
        });
        
        // إضافة plugins وهمية
        Object.defineProperty(navigator, 'plugins', {
          get: () => [1, 2, 3, 4, 5],
        });
        
        // إضافة chrome وهمي
        window.chrome = {
          runtime: {},
          loadTimes: function() {},
          csi: function() {},
          app: {},
        };
      });
      
      const page = await context.newPage();
      
      console.log(`Starting test for number: ${this.number}`);
      console.log(`Device: ${this.deviceName}`);
      
      // الانتقال إلى الصفحة المطلوبة
      await page.goto('https://auth.uber.com/v2/', { 
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });
      
      // انتظار قليلاً قبل ملء النموذج
      await page.waitForTimeout(500);
      
      // ملء رقم الهاتف
      await page.fill('#PHONE_NUMBER_or_EMAIL_ADDRESS', this.number);
      
      // انتظار قليلاً قبل النقر
      await page.waitForTimeout(300);
      
      // النقر على زر التقديم
      await page.click('#forward-button');
      
      // انتظار الاستجابة
      await page.waitForTimeout(30000);

      await page.click('#alt-action-resend-sms');

      await page.waitForTimeout(14000);

      await page.click('#alt-action-resend-sms');

      await page.waitForTimeout(15000);
      
      
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