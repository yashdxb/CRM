import { defineConfig } from '@playwright/test';

const baseURL = process.env.E2E_BASE_URL || 'http://localhost:4201';

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    headless: true,
    viewport: { width: 1280, height: 720 }
  },
  webServer: {
    command: 'npm run start -- --port 4201',
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ]
});
