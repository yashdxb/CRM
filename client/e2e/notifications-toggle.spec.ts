import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

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

test('SLA email alerts toggle can turn off/on', async ({ page, request }) => {
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/notifications');
  await expect(page.getByRole('heading', { name: /Notification preferences/i })).toBeVisible();

  const row = page.locator('.preference-row', { hasText: 'SLA + idle deal alerts' });
  const toggle = row.locator('.p-toggleswitch');

  await expect(toggle).toBeVisible();
  const isChecked = async () => toggle.evaluate((el) => el.classList.contains('p-toggleswitch-checked'));
  const wasChecked = await isChecked();

  await toggle.click();
  await expect.poll(isChecked).toBe(!wasChecked);

  await toggle.click();
  await expect.poll(isChecked).toBe(wasChecked);
});
