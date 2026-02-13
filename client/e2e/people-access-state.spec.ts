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
    throw new Error('Unable to authenticate against the API for UI test.');
  }

  await page.addInitScript((token) => {
    window.localStorage.setItem('auth_token', token as string);
    window.localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

test('people & access users view preserves search state across tabs and refresh', async ({ page, request }) => {
  await login(page, request);

  await page.goto('/app/settings/users');
  await page.waitForLoadState('networkidle');

  const searchInput = page.getByPlaceholder('Search by name or email');
  await expect(searchInput).toBeVisible();

  await searchInput.fill('leo');

  const topTabs = page.locator('.people-tabs');
  await topTabs.getByRole('button', { name: 'Roles', exact: true }).click();
  await expect(page).toHaveURL(/\/app\/settings\/roles/);

  await topTabs.getByRole('button', { name: 'Users', exact: true }).click();
  await expect(page).toHaveURL(/\/app\/settings\/users/);
  await expect(searchInput).toHaveValue('leo');

  await page.reload();
  await page.waitForLoadState('networkidle');
  await expect(page.getByPlaceholder('Search by name or email')).toHaveValue('leo');
});
