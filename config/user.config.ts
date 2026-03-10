import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list']
  ],
  use: {
    baseURL: 'https://reqres.in',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
});