import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.E2E_API_URL ?? 'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? process.env.E2E_ADMIN_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

test('edit lead owner select respects sales rep readonly', async ({ page, request }) => {
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

  await page.goto('/app/leads');
  await page.locator('.leads-table, .table-section').first().waitFor({ state: 'visible' });

  const editButton = page.locator('button[title="Edit"]').first();
  await expect(editButton).toBeVisible();
  await editButton.click();
  await page.waitForURL('**/app/leads/**/edit');

  const ownerSelect = page.locator('p-select[name="ownerId"]');
  await ownerSelect.waitFor({ state: 'visible' });

  const roleList = (Array.isArray(payload?.roles) ? payload.roles : []).map((r: string) => String(r).toLowerCase());
  const isSalesRep = roleList.some((r: string) => r === 'sales rep' || r === 'salesrep' || r.includes('sales rep'));

  const hostClass = (await ownerSelect.first().getAttribute('class')) ?? '';
  const disabledByClass = hostClass.includes('p-disabled');
  const disabledByAttr = (await ownerSelect.first().getAttribute('aria-disabled')) === 'true';

  if (isSalesRep) {
    expect(disabledByClass || disabledByAttr).toBeTruthy();
  }
});
