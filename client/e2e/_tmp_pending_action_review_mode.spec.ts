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
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

test('pending action opens read-only decision review with approval history', async ({ page, request }) => {
  await login(page, request);

  await page.goto('/app/decisions/pending-action', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'Pending Action', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Pending Action Items/i })).toBeVisible();

  const rows = page.locator('table tbody tr.pending-row');
  const count = await rows.count();
  expect(count).toBeGreaterThan(0);

  await rows.first().click();

  await expect(page.locator('text=Decision review mode')).toBeVisible();
  await expect(page.locator('h2:has-text("Review Action")')).toBeVisible();
  await expect(page.locator('h2:has-text("Approval History")')).toBeVisible();

  await page.screenshot({ path: 'output/playwright/pending-action-opened-review-mode.png', fullPage: true });
});
