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
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

test('settings tabs are visible/clickable and page has no runtime errors', async ({ page, request }) => {
  const runtimeErrors: string[] = [];

  page.on('pageerror', (err) => runtimeErrors.push(`pageerror: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      runtimeErrors.push(`console: ${msg.text()}`);
    }
  });

  await login(page, request);

  await page.goto('/app/settings');
  await page.waitForLoadState('networkidle');

  const tabs = page.locator('.people-tabs .view-chip');
  await expect(tabs).toHaveCount(4);

  await page.getByRole('button', { name: 'Roles' }).click();
  await expect(page.getByRole('button', { name: 'Roles' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('app-roles-page')).toBeVisible();

  await page.getByRole('button', { name: 'Teams' }).click();
  await expect(page.getByRole('button', { name: 'Teams' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText('Teams view')).toBeVisible();

  await page.getByRole('button', { name: 'Users' }).click();
  await expect(page.getByRole('button', { name: 'Users' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('.table-toolbar')).toBeVisible();

  await page.screenshot({ path: 'test-results/settings-tabs-debug.png', fullPage: true });
  expect(runtimeErrors).toEqual([]);
});
