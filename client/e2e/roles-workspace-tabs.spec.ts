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

test('roles workspace tabs switch to Security Levels', async ({ page, request }) => {
  const runtimeErrors: string[] = [];
  page.on('pageerror', (err) => runtimeErrors.push(`pageerror: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      runtimeErrors.push(`console: ${msg.text()}`);
    }
  });

  await login(page, request);
  await page.goto('/app/settings/users');
  await page.waitForLoadState('networkidle');

  const rolesTopTab = page.getByRole('button', { name: 'Roles' });
  await expect(rolesTopTab).toBeVisible();
  await rolesTopTab.click();
  await expect(page).toHaveURL(/\/app\/settings\/roles/);
  await expect(page.locator('app-roles-page')).toBeVisible();

  const securityTab = page.getByRole('tab', { name: 'Security Levels' });
  await expect(securityTab).toBeVisible();
  await securityTab.click();

  await expect(securityTab).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('heading', { name: 'Security Level Definitions' })).toBeVisible();
  await expect(page).toHaveURL(/tab=security-levels/);
  await expect(page.locator('app-roles-page')).toBeVisible();

  expect(runtimeErrors).toEqual([]);
});
