import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'super.admin@crmenterprise.demo';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'ChangeThisSuper!1';

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

test('people and access users table shows environment column', async ({ page, request }) => {
  await login(page, request);

  await page.goto('/app/settings/users');

  await expect(page.getByRole('heading', { name: /People & Access|Team & Access Management/i }).first()).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Environment' })).toBeVisible();
  await expect(page.locator('table tbody tr').first()).toBeVisible();
});
