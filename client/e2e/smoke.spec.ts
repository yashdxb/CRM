import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? 'http://127.0.0.1:5016';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = 'ChangeThisAdmin!1';

async function login(page, request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  const payload = await response.json();
  if (!payload?.accessToken) {
    throw new Error('Unable to authenticate against the API for UI test.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
  }, payload.accessToken);
}

function attachDiagnostics(page) {
  page.on('pageerror', (err) => console.log('pageerror:', err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log('console error:', msg.text());
    }
  });
  page.on('requestfailed', (req) => {
    const failure = req.failure()?.errorText ?? '';
    if (req.url().includes('/api/') && !failure.includes('net::ERR_ABORTED')) {
      console.log('request failed:', req.url(), failure);
    }
  });
}

test('core screens smoke', async ({ page, request }) => {
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/dashboard');
  await expect(page.getByRole('heading', { name: 'Command Center' })).toBeVisible();

  await page.goto('/app/customers');
  await expect(page.locator('h1.hero-title')).toContainText('Customer');

  await page.goto('/app/contacts');
  await expect(page.locator('h1.hero-title')).toContainText('Contact');

  await page.goto('/app/leads');
  await expect(page.getByRole('heading', { name: /Leads/i })).toBeVisible();

  await page.goto('/app/opportunities');
  await expect(page.getByRole('heading', { name: /Opportunity intelligence/i })).toBeVisible();

  await page.goto('/app/activities');
  await expect(page.getByRole('heading', { name: /Activities/i })).toBeVisible();

  await page.goto('/app/settings/users');
  await expect(page.getByRole('heading', { name: /Team & Access Management/i })).toBeVisible();
});
