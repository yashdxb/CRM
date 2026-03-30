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
    throw new Error('Unable to authenticate against the API for workflow builder test.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

test('workflow builder renders simplified table-first mock and supports draft lifecycle', async ({ page, request }) => {
  await login(page, request);
  await page.goto('/app/workflows/designer');

  await expect(page.getByRole('heading', { name: 'Approval Workflow Builder' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Workflows should feel like managed records first, not diagrams first.' })).toBeVisible();
  await expect(page.getByLabel('Workflow Name')).toHaveValue('High Discount Approval');
  await expect(page.getByRole('columnheader', { name: 'Workflow' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Step / Group' })).toBeVisible();
  await expect(page.locator('tr', { hasText: 'Finance & Legal review' })).toBeVisible();
  await expect(page.locator('tr', { hasText: 'Director final approval' })).toBeVisible();
  await expect(page.getByText('Workflow is ready to publish.', { exact: true })).toBeVisible();
  await expect(
    page.getByText(/If Discount Percent greater than 10 and Deal Value greater than or equal 50000, send approval to Sales Manager\./i)
  ).toBeVisible();

  await page.getByLabel('Workflow Name').fill('High Discount Approval - QA');
  await expect(page.getByLabel('Workflow Name')).toHaveValue('High Discount Approval - QA');

  await page.getByRole('button', { name: 'Save Draft' }).click();
  await expect(page.getByText('Workflow draft saved.')).toBeVisible();

  await page.getByRole('button', { name: 'Publish' }).click();
  await expect(page.getByText('Workflow published.')).toBeVisible();
  await expect(page.locator('.page-header__eyebrow .p-tag-label', { hasText: 'Active' })).toBeVisible();
});
