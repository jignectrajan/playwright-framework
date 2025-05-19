import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    screenshot: 'only-on-failure', // 👈 captures screenshot when test fails
    trace: 'on-first-retry',       // optional: captures trace for failures
    headless: false  // run in headed mode
  },
  reporter: [['list'], ['allure-playwright']],
});
