import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 120000,

  use: {
    baseURL: 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login', //BaseURL 
    screenshot: 'only-on-failure', // 👈 captures screenshot when test fails
    trace: 'on-first-retry',       // optional: captures trace for failures
    headless: false,  // run in headed mode
    viewport: null,      // disables viewport emulation; uses the browser window size
    launchOptions: {
      args: ['--start-maximized'], // start maximized window
    },
  },
  reporter: [['list'], ['allure-playwright']],

});
