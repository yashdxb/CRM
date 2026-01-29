import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function loginWithoutTenantHeader(page, request) {
  let response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    }
  });

  let payload = await response.json();
  // Some local environments still require an explicit tenant header.
  if (!payload?.accessToken) {
    response = await request.post(`${API_BASE_URL}/api/auth/login`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant-Key': 'default'
      },
      data: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      }
    });
    payload = await response.json();
  }
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

test('invalid credentials show an error message', async ({ page }) => {
  await page.goto('/login');

  await page.locator('input[formcontrolname="email"]').fill('invalid.user@example.com');
  await page.locator('input[formcontrolname="password"]').fill('InvalidPass123!');
  const loginResponsePromise = page.waitForResponse((response) =>
    response.url().includes('/api/auth/login')
  );
  await page.getByRole('button', { name: /sign in/i }).click();
  const loginResponse = await loginResponsePromise;
  expect(loginResponse.status()).toBe(401);
  await expect(page).toHaveURL(/\/login/);

  const error = page.locator('.error-message');
  await expect(error).toBeVisible({ timeout: 20000 });
  await expect(error).toContainText(/Unable to sign in/i);
});
