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

test('risk intelligence workspace renders prioritized guidance with drill-through', async ({ page, request }) => {
  await login(page, request);

  await page.goto('/app/dashboard');
  const navRiskLink = page.locator('.nav__item', { hasText: 'Risk Intelligence' });
  await expect(navRiskLink).toBeVisible();

  await navRiskLink.click();
  await expect(page).toHaveURL(/\/app\/risk-intelligence/);
  await expect(page.getByRole('heading', { name: 'Risk Intelligence' })).toBeVisible();
  await expect(page.locator('[data-testid="risk-summary-grid"]')).toBeVisible();

  const table = page.locator('[data-testid="risk-priority-table"]');
  await expect(table).toBeVisible();

  const rows = table.locator('tbody tr');
  await expect(rows.first()).toBeVisible();
  expect(await rows.count()).toBeGreaterThan(0);

  await rows.first().click();
  await expect(page.locator('[data-testid="risk-open-selected"]')).toBeVisible();
  await page.locator('[data-testid="risk-open-selected"]').click();

  await expect(page).toHaveURL(/\/app\/(deals|leads|decisions|activities|customers|dashboard)/);
});
