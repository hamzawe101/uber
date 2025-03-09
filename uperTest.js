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

  // محاكاة حركة الماوس البشرية
  async simulateHumanMouseMovement(page) {
    const width = page.viewportSize().width;
    const height = page.viewportSize().height;
    
    // عدد عشوائي من الحركات
    const movesCount = 3 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < movesCount; i++) {
      // موقع عشوائي على الصفحة
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      
      // حركة بطيئة إلى الموقع
      await page.mouse.move(x, y, { steps: 10 });
      
      // انتظار عشوائي بين الحركات
      await page.waitForTimeout(100 + Math.random() * 400);
    }
  }

  // محاكاة الكتابة البشرية
  async simulateHumanTyping(page, selector, text) {
    await page.focus(selector);
    
    // كتابة النص حرفًا حرفًا مع تأخير عشوائي
    for (const char of text) {
      await page.keyboard.type(char, { delay: 50 + Math.random() * 150 });
      
      // احتمالية صغيرة للتوقف المؤقت أثناء الكتابة
      if (Math.random() < 0.1) {
        await page.waitForTimeout(200 + Math.random() * 300);
      }
    }
  }

  constructor(number) {
    this.number = number;
    
    // اختيار جهاز عشوائي من ملف الأجهزة
    this.deviceName = this.deviceNames[Math.floor(Math.random() * this.deviceNames.length)];
    this.customDevice = this.deviceDescriptors[this.deviceName];
    
    // Determine country code from phone number
    let countryCode = 'us'; // Default
    let localNumber = number;
    
    // Find the longest matching prefix
    let longestMatch = '';
    for (const prefix in this.countryCodeMap) {
      if (number.startsWith(prefix) && prefix.length > longestMatch.length) {
        longestMatch = prefix;
        countryCode = this.countryCodeMap[prefix];
        localNumber = number.substring(prefix.length); // استخراج الرقم المحلي بدون مقدمة الدولة
      }
    }
    
    // حفظ الرقم المحلي ورمز الدولة
    this.countryPrefix = longestMatch;
    this.localNumber = localNumber;
    
    // Proxy configuration with dynamic country code
    this.proxy = {
      server: "as.2a5c7a83de539ea5.abcproxy.vip:4950",
      username: `Bwrka67HY5-zone-star-region-${countryCode}`,
      password: "72237663",
    };

    console.log(`Selected device for ${number}: ${this.deviceName}`);
    console.log(`Country code detected: ${longestMatch} -> ${countryCode}`);
    console.log(`Local number (without prefix): ${localNumber}`);
    console.log(`Proxy for ${number}: ${this.proxy.server} (${this.proxy.username})`);

    // إعدادات المتصفح المحسنة لتجنب الكشف
    this.launchArgs = [
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-site-isolation-trials',
      '--disable-web-security',
      '--no-sandbox',
      '--window-size=1920,1080',
      '--start-maximized',
      '--disable-infobars',
      '--disable-notifications',
      '--disable-popup-blocking',
      '--disable-extensions',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-default-browser-check',
      '--no-zygote',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-breakpad',
      '--disable-component-extensions-with-background-pages',
      '--disable-features=TranslateUI,BlinkGenPropertyTrees',
      '--disable-ipc-flooding-protection',
      '--disable-renderer-backgrounding',
      '--force-color-profile=srgb',
      '--metrics-recording-only',
    ];

    // Browser options
    this.options = {
      headless: false,
      args: this.launchArgs,
      ignoreDefaultArgs: ['--enable-automation', '--enable-blink-features=IdleDetection'],
      ignoreHTTPSErrors: true,
      bypassCSP: true,
      proxy: this.proxy,
      timeout: 60000,
    };
    
    // إنشاء معرف فريد للجلسة
    this.sessionId = Math.random().toString(36).substring(2, 15);
  }

  async run() {
    let browser;
    try {
      browser = await chromium.launch(this.options);
      
      // إعداد موقع جغرافي عشوائي مناسب للدولة
      const randomGeolocation = {
        latitude: 23.5186 + (Math.random() * 10 - 5),
        longitude: -15.5926 + (Math.random() * 10 - 5)
      };
      
      // إعداد سياق المتصفح باستخدام معلومات الجهاز
      const context = await browser.newContext({
        userAgent: this.customDevice.userAgent,
        viewport: this.customDevice.viewport,
        deviceScaleFactor: this.customDevice.deviceScaleFactor,
        isMobile: this.customDevice.isMobile,
        hasTouch: this.customDevice.hasTouch,
        locale: 'en-US',
        timezoneId: 'Africa/Casablanca',
        geolocation: randomGeolocation,
        permissions: ['geolocation'],
        colorScheme: 'light',
        javaScriptEnabled: true,
        acceptDownloads: true,
      });
      
      // تحميل ملفات تعريف الارتباط السابقة إن وجدت
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
      
      // إضافة سكريبت لتجنب الكشف
      await context.addInitScript(() => {
        // تعريف دالة لإخفاء الكشف
        const hideAutomation = () => {
          // إخفاء خاصية webdriver
          Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
            configurable: true
          });
          
          // إضافة plugins وهمية
          Object.defineProperty(navigator, 'plugins', {
            get: () => {
              const plugins = [];
              for (let i = 0; i < 5; i++) {
                plugins.push({
                  name: ['Flash', 'Chrome PDF Plugin', 'Native Client', 'Chrome PDF Viewer', 'Shockwave Flash'][i],
                  description: ['Shockwave Flash', 'Portable Document Format', 'Native Client Executable', 'Chrome PDF Viewer', 'Shockwave Flash 32.0 r0'][i],
                  filename: ['flash.dll', 'internal-pdf-viewer', 'internal-nacl-plugin', 'mhjfbmdgcfjbbpaeojofohoefgiehjai', 'pepflashplayer.dll'][i],
                  length: 1,
                  item: () => null,
                  namedItem: () => null
                });
              }
              return plugins;
            },
            configurable: true
          });
          
          // إضافة chrome وهمي
          window.chrome = {
            runtime: {
              connect: () => ({
                onMessage: {
                  addListener: () => {},
                  removeListener: () => {},
                },
                postMessage: () => {},
                disconnect: () => {},
              }),
              sendMessage: () => {},
              onMessage: {
                addListener: () => {},
                removeListener: () => {},
              },
              getPlatformInfo: () => Promise.resolve({ os: 'win' }),
              getManifest: () => ({ manifest_version: 3 }),
            },
            webstore: {
              onInstallStageChanged: {
                addListener: () => {},
              },
              onDownloadProgress: {
                addListener: () => {},
              },
            },
            app: {
              isInstalled: false,
              getDetails: () => {},
              getIsInstalled: () => {},
              runningState: () => {},
            },
            loadTimes: () => ({
              firstPaintTime: Date.now() - 1000,
              firstPaintAfterLoadTime: Date.now() - 800,
              requestTime: Date.now() - 1500,
              startLoadTime: Date.now() - 1500,
              commitLoadTime: Date.now() - 1000,
              finishDocumentLoadTime: Date.now() - 800,
              finishLoadTime: Date.now() - 700,
              firstPaintAfterLoadTime: Date.now() - 600,
            }),
            csi: () => ({
              startE: Date.now() - 1000,
              onloadT: Date.now() - 800,
              pageT: Date.now() - 700,
              tran: 15,
            }),
          };
          
          // إخفاء خاصية الكشف عن الأتمتة
          const originalHasOwnProperty = Object.prototype.hasOwnProperty;
          Object.prototype.hasOwnProperty = function(property) {
            if (property === 'webdriver') {
              return false;
            }
            return originalHasOwnProperty.apply(this, arguments);
          };
          
          // تعديل permissions API
          if (navigator.permissions) {
            const originalQuery = navigator.permissions.query;
            navigator.permissions.query = function(parameters) {
              if (parameters.name === 'notifications' || parameters.name === 'clipboard-read' || parameters.name === 'clipboard-write') {
                return Promise.resolve({ state: 'granted', onchange: null });
              }
              return originalQuery.apply(this, arguments);
            };
          }
          
          // تعديل خصائص navigator الأخرى
          Object.defineProperties(navigator, {
            languages: {
              get: () => ['en-US', 'en', 'ar'],
              configurable: true
            },
            platform: {
              get: () => 'Win32',
              configurable: true
            },
            hardwareConcurrency: {
              get: () => 8,
              configurable: true
            },
            deviceMemory: {
              get: () => 8,
              configurable: true
            },
            appVersion: {
              get: () => '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              configurable: true
            },
            maxTouchPoints: {
              get: () => 0,
              configurable: true
            },
            vendor: {
              get: () => 'Google Inc.',
              configurable: true
            },
            connection: {
              get: () => ({
                effectiveType: '4g',
                rtt: 50,
                downlink: 10,
                saveData: false
              }),
              configurable: true
            }
          });
          
          // تعديل toString لإخفاء التعديلات
          const originalToString = Function.prototype.toString;
          Function.prototype.toString = function() {
            if (this === Function.prototype.toString) return originalToString.call(this);
            if (this === navigator.permissions.query) return 'function query() { [native code] }';
            return originalToString.call(this);
          };
        };
        
        // تنفيذ الدالة
        hideAutomation();
        
        // تنفيذ الدالة مرة أخرى بعد تحميل الصفحة
        document.addEventListener('DOMContentLoaded', hideAutomation);
      });
      
      const page = await context.newPage();
      
      // تعديل طلبات الشبكة لإخفاء علامات الأتمتة
      await page.route('**/*', async (route) => {
        const request = route.request();
        
        // تعديل الهيدرز لتبدو أكثر طبيعية
        const headers = request.headers();
        headers['Accept-Language'] = 'en-US,en;q=0.9,ar;q=0.8';
        headers['sec-ch-ua'] = '"Google Chrome";v="120", "Chromium";v="120", "Not=A?Brand";v="99"';
        headers['sec-ch-ua-mobile'] = this.customDevice.isMobile ? '?1' : '?0';
        headers['sec-ch-ua-platform'] = this.customDevice.isMobile ? '"Android"' : '"Windows"';
        
        // متابعة الطلب مع الهيدرز المعدلة
        await route.continue({ headers });
      });
      
      console.log(`Starting test for number: ${this.number}`);
      console.log(`Device: ${this.deviceName}`);
      
      // محاكاة تصفح بشري قبل الانتقال للصفحة المطلوبة
      await this.simulateHumanMouseMovement(page);
      
      // الانتقال إلى الصفحة المطلوبة
      await page.goto('https://auth.uber.com/v2/', { 
        waitUntil: 'domcontentloaded',
        timeout: 50000
      });
      
      // انتظار قليلاً قبل التفاعل مع الصفحة
      await page.waitForTimeout(1000 + Math.random() * 1000);
      
      // محاكاة حركة الماوس قبل ملء النموذج
      await this.simulateHumanMouseMovement(page);
      
      // ملء رقم الهاتف بطريقة بشرية (استخدام الرقم المحلي بدون مقدمة الدولة)
      await this.simulateHumanTyping(page, '#PHONE_NUMBER_or_EMAIL_ADDRESS', this.localNumber);
      
      // محاكاة حركة الماوس قبل النقر على الزر
      await this.simulateHumanMouseMovement(page);
      
      // النقر على زر التقديم
      await page.click('#forward-button');
      
      // انتظار الاستجابة
      await page.waitForTimeout(30000);
      
      // محاولة النقر على زر إعادة إرسال الرسالة النصية
      try {
        await this.simulateHumanMouseMovement(page);
        await page.click('#alt-action-resend-sms');
        await page.waitForTimeout(14000);
        
        await this.simulateHumanMouseMovement(page);
        await page.click('#alt-action-resend-sms');
        await page.waitForTimeout(15000);
      } catch (error) {
        console.log('Could not click resend button, might not be available');
      }
      
      // حفظ ملفات تعريف الارتباط للاستخدام المستقبلي
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