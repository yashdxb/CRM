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
    localStorage.setItem('tenant_key', 'default');
    localStorage.setItem('tenant_key', tenantKey as string);
  }, payload.accessToken, payload.tenantKey ?? 'default');
}

test.describe('mobile dashboard layout', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('sidebar is off-canvas by default and can be toggled', async ({ page, request }) => {
    await loginWithoutTenantHeader(page, request);

    await page.goto('/app/dashboard');
    const shell = page.locator('.shell');
    await expect(shell).toBeVisible();
    await expect(shell).toHaveClass(/shell--collapsed/);

    const sidebar = page.locator('.sidebar');
    const box = await sidebar.boundingBox();
    if (!box) throw new Error('Sidebar bounding box not found');
    expect(box.x + box.width).toBeLessThanOrEqual(10);

    await page.locator('.topbar__toggle').click();
    await expect(shell).not.toHaveClass(/shell--collapsed/);
    await page.waitForTimeout(300);
    const openBox = await sidebar.boundingBox();
    if (!openBox) throw new Error('Sidebar bounding box not found after open');
    expect(openBox.x).toBeGreaterThanOrEqual(-1);

    await page.locator('.topbar__toggle').click();
    await expect(shell).toHaveClass(/shell--collapsed/);
  });
});
