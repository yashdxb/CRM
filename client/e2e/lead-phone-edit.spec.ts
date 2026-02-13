import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.E2E_API_URL ?? 'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';

async function loginByApi(request: any) {
  const login = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: SALES_REP_EMAIL, password: SALES_REP_PASSWORD }
  });
  expect(login.ok()).toBeTruthy();
  const payload = await login.json();
  expect(payload?.accessToken).toBeTruthy();
  return payload.accessToken as string;
}

async function selectByLabel(page: any, selectName: string, label: string) {
  const root = page.locator(`p-select[name="${selectName}"]`).first();
  await root.waitFor({ state: 'visible' });
  await root.click();
  const panelItem = page
    .locator('.p-select-overlay .p-select-option, .p-select-panel .p-select-option')
    .filter({ hasText: label })
    .first();
  await panelItem.waitFor({ state: 'visible' });
  await panelItem.click();
}

test('edit lead saves and reloads phone + country correctly', async ({ page, request }) => {
  const token = await loginByApi(request);
  const suffix = Date.now();

  const create = await request.post(`${API_BASE_URL}/api/leads`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    },
    data: {
      firstName: 'Phone',
      lastName: `Regression ${suffix}`,
      companyName: 'Phone QA Inc',
      assignmentStrategy: 'Manual',
      status: 'New'
    }
  });
  expect(create.ok()).toBeTruthy();
  const lead = await create.json();
  expect(lead?.id).toBeTruthy();

  await page.addInitScript((accessToken) => {
    localStorage.setItem('auth_token', accessToken as string);
    localStorage.setItem('tenant_key', 'default');
  }, token);

  await page.goto(`/app/leads/${lead.id}/edit`);
  await page.waitForURL('**/app/leads/**/edit');
  await page.locator('form.lead-form').waitFor({ state: 'visible' });

  await selectByLabel(page, 'phoneCountry', 'United States');
  await page.locator('input[name="phoneNumber"]').fill('4155550134');

  const updateCall = page.waitForResponse(
    (response) => response.url().includes(`/api/leads/${lead.id}`) && response.request().method() === 'PUT'
  );
  await page.locator('button:has-text("Update lead")').click();
  const updateResponse = await updateCall;
  expect(updateResponse.ok()).toBeTruthy();

  const details = await request.get(`${API_BASE_URL}/api/leads/${lead.id}`, {
    headers: {
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    }
  });
  expect(details.ok()).toBeTruthy();
  const saved = await details.json();
  expect(saved?.phone).toBe('+14155550134');

  await page.reload();
  await page.locator('form.lead-form').waitFor({ state: 'visible' });
  await expect(page.locator('p-select[name="phoneCountry"] .p-select-label')).toContainText('United States');
  await expect(page.locator('input[name="phoneNumber"]')).toHaveValue(/415.*555.*0134/);
});
