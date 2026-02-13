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

function isTransparentColor(value: string | null): boolean {
  if (!value) {
    return true;
  }
  const normalized = value.replace(/\s+/g, '').toLowerCase();
  return normalized === 'transparent' || normalized === 'rgba(0,0,0,0)' || normalized.endsWith(',0)');
}

test('tab labels remain visible on hover', async ({ page, request }) => {
  await login(page, request);

  await page.goto('/app/settings/roles');
  await page.waitForLoadState('networkidle');

  const securityTab = page.getByRole('tab', { name: 'Security Levels' });
  await expect(securityTab).toBeVisible();
  await securityTab.hover();

  const securityTabColor = await securityTab.evaluate((el) => getComputedStyle(el as HTMLElement).color);
  expect(isTransparentColor(securityTabColor)).toBeFalsy();

  await page.goto('/app/settings/roles/new');
  await page.waitForLoadState('networkidle');

  const presetsTab = page.getByRole('tab', { name: 'Presets' }).first();
  await expect(presetsTab).toBeVisible();
  await presetsTab.hover();

  const presetsTabColor = await presetsTab.evaluate((el) => getComputedStyle(el as HTMLElement).color);
  expect(isTransparentColor(presetsTabColor)).toBeFalsy();

  await page.screenshot({ path: 'test-results/tab-hover-visibility.png', fullPage: true });
});
