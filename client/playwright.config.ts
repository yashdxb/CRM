import { defineConfig } from '@playwright/test';

const baseURL = process.env.E2E_BASE_URL || 'https://www.northedgesystem.com';
const apiEnv = process.env.E2E_API_URL || process.env.API_BASE_URL;
if (!apiEnv && !baseURL.includes('localhost') && !baseURL.includes('127.0.0.1')) {
  process.env.E2E_API_URL = 'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
}
const shouldStartServer =
  !process.env.E2E_SKIP_SERVER && (baseURL.startsWith('http://localhost') || baseURL.startsWith('http://127.0.0.1'));

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    headless: true,
    viewport: { width: 1280, height: 720 }
  },
  webServer: shouldStartServer
    ? {
        command: 'npm run start -- --port 4201',
        url: baseURL,
        reuseExistingServer: true,
        timeout: 120_000
      }
    : undefined,
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ]
});
