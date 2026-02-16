import { expect, test } from '@playwright/test';

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
    throw new Error('Unable to authenticate against API.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

test('dashboard pack selector is shown in user edit, not in users list', async ({ page, request }) => {
  await login(page, request);
  await page.goto('/app/settings/users', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('columnheader', { name: 'Dashboard Pack' })).toHaveCount(0);
  await page.locator('tbody .user-row').first().click();
  await expect(page.locator('label[for=\"userDashboardPack\"]')).toBeVisible();
});
