import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';
const TENANT_KEY = process.env.E2E_TENANT_KEY ?? 'default';

async function apiLogin(request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': TENANT_KEY },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  const payload = await response.json();
  if (!payload?.accessToken) {
    throw new Error('Unable to authenticate against API.');
  }
  return payload.accessToken as string;
}

test('People & Access dashboard packs route shows redesigned page', async ({ page, request }) => {
  const token = await apiLogin(request);

  await page.addInitScript(
    ({ t, tenantKey }) => {
      localStorage.setItem('auth_token', t);
      localStorage.setItem('tenant_key', tenantKey);
    },
    { t: token, tenantKey: TENANT_KEY }
  );

  await page.goto('/app/settings/dashboard-packs', { waitUntil: 'networkidle' });

  await expect(page.getByRole('heading', { name: 'People & Access' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Dashboard Packs' })).toBeVisible();
  await expect(page.locator('.summary-strip .summary-pill')).toHaveCount(3);
  await expect(page.getByRole('heading', { name: 'Dashboard pack designer' })).toBeVisible();
  await expect(page.getByText('Cards and widgets table (display order)')).toBeVisible();
  await expect(page.locator('.kpi-table tbody tr')).not.toHaveCount(0);
});
