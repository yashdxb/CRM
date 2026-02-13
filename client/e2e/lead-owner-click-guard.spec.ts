import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.E2E_API_URL ?? 'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';

test('sales rep cannot open owner dropdown in edit lead', async ({ page, request }) => {
  const login = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: SALES_REP_EMAIL, password: SALES_REP_PASSWORD }
  });
  const payload = await login.json();
  expect(payload?.accessToken).toBeTruthy();

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);

  const create = await request.post(`${API_BASE_URL}/api/leads`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${payload.accessToken}`
    },
    data: {
      firstName: 'Playwright',
      lastName: `OwnerGuard ${Date.now()}`,
      companyName: 'Owner Guard Co',
      assignmentStrategy: 'Manual',
      status: 'New'
    }
  });
  expect(create.ok()).toBeTruthy();
  const lead = await create.json();
  expect(lead?.id).toBeTruthy();

  await page.goto(`/app/leads/${lead.id}/edit`);
  await page.waitForURL('**/app/leads/**/edit');

  const ownerSelect = page.locator('p-select[name="ownerId"]');
  await ownerSelect.waitFor({ state: 'visible' });

  const cls = (await ownerSelect.getAttribute('class')) ?? '';
  expect(cls.includes('p-disabled')).toBeTruthy();

  await ownerSelect.click({ force: true });
  await page.waitForTimeout(300);

  const panel = page.locator('.p-select-overlay .p-select-item, .p-select-panel .p-select-item');
  await expect(panel).toHaveCount(0);
});
