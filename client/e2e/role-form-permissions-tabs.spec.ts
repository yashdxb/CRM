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

test('role form permissions use tabs and checkbox toggles', async ({ page, request }) => {
  await login(page, request);

  await page.goto('/app/settings/roles/new');
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('tab', { name: 'All Permissions' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Presets' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Drift' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Effective Access' })).toBeVisible();
  await expect(page.getByRole('tab', { name: /Create & Manage/i })).toBeVisible();
  await expect(page.getByRole('tab', { name: /View & Analyze/i })).toBeVisible();
  await expect(page.getByRole('tab', { name: /Governance/i })).toBeVisible();

  const firstCheckbox = page.locator('.permissions-section .capability-row .p-checkbox').first();
  await firstCheckbox.click();
  await expect(firstCheckbox).toHaveClass(/p-checkbox-checked/);

  await page.getByRole('tab', { name: /View & Analyze/i }).click();
  await expect(page.getByRole('tab', { name: /View & Analyze/i })).toHaveAttribute('aria-selected', 'true');

  await page.getByRole('tab', { name: /Governance/i }).click();
  await expect(page.getByRole('tab', { name: /Governance/i })).toHaveAttribute('aria-selected', 'true');

  await page.getByRole('tab', { name: 'Presets' }).click();
  await expect(page.getByText('Role intent packs')).toBeVisible();

  await page.getByRole('tab', { name: 'Drift' }).click();
  await expect(page.getByText('Role drift')).toBeVisible();

  await page.getByRole('tab', { name: 'Effective Access' }).click();
  await expect(page.getByText('Direct permissions')).toBeVisible();
});
