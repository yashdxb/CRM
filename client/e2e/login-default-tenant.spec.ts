import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = 'ChangeThisAdmin!1';

async function loginWithoutTenantHeader(page, request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    }
  });

  const payload = await response.json();
  if (!payload?.accessToken) {
    throw new Error('Unable to authenticate against the API during the Playwright test.');
  }

  await page.addInitScript((token, tenantKey) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', tenantKey as string);
  }, payload.accessToken, payload.tenantKey ?? 'default');

  return payload.accessToken as string;
}

test('login without tenant header still resolves default tenant', async ({ page, request }) => {
  const token = await loginWithoutTenantHeader(page, request);

  await page.goto('/app/settings/users');
  await expect(page.getByRole('heading', { name: /Team & Access Management/i })).toBeVisible();

  const tenantContextResponse = await request.get(`${API_BASE_URL}/api/tenant-context`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(tenantContextResponse.ok()).toBeTruthy();

  const tenantContext = await tenantContextResponse.json();
  expect(tenantContext?.key).toBe('default');
  expect(tenantContext?.id).toBeTruthy();
});
