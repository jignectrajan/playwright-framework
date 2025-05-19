import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false  // run in headed mode
  },
  reporter: [['list'], ['allure-playwright']],
});
