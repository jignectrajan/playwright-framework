import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false  // run in headed mode
  },
 testDir: './tests',
  testMatch: '*.spec.ts',
  reporter: [['list'], ['allure-playwright']],
});
