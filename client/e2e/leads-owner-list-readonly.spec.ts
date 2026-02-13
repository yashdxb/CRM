import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.E2E_API_URL ?? 'http://localhost:5014';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';

test('sales rep cannot edit owner from leads list', async ({ page, request }) => {
  const login = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: SALES_REP_EMAIL, password: SALES_REP_PASSWORD }
  });
  const payload = await login.json();
  expect(payload?.accessToken).toBeTruthy();

  await request.post(`${API_BASE_URL}/api/leads`, {
    headers: {
      Authorization: `Bearer ${payload.accessToken}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      firstName: 'List',
      lastName: `Owner ${Date.now()}`,
      companyName: 'List Owner Guard',
      assignmentStrategy: 'Manual',
      status: 'New'
    }
  });

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);

  await page.goto('/app/leads');
  await page.locator('.leads-table').first().waitFor({ state: 'visible' });

  const ownerSelect = page.locator('td.td-owner p-select').first();
  await ownerSelect.waitFor({ state: 'visible' });
  const cls = (await ownerSelect.getAttribute('class')) ?? '';
  const ariaDisabled = (await ownerSelect.getAttribute('aria-disabled')) === 'true';
  expect(cls.includes('p-disabled') || ariaDisabled).toBeTruthy();
});
