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

  return payload.accessToken as string;
}

test('qualification policy exposes configurable evidence sources and lead edit shows expanded list', async ({ page, request }) => {
  const token = await login(page, request);

  await page.goto('/app/settings/qualification-policy');
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('Evidence Source Catalog')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add source' })).toBeVisible();
  const sourceValues = await page.locator('.policy-block input.p-inputtext').evaluateAll((nodes) =>
    nodes
      .map((node) => (node as HTMLInputElement).value?.trim())
      .filter((value) => !!value)
  );
  expect(sourceValues).toContain('No evidence yet');
  expect(sourceValues).toContain('Discovery call notes');

  const leadsResponse = await request.get(`${API_BASE_URL}/api/leads?page=1&pageSize=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  const leadsPayload = await leadsResponse.json();
  const leadId = leadsPayload?.items?.[0]?.id as string | undefined;
  expect(leadId).toBeTruthy();

  await page.goto(`/app/leads/${leadId}/edit`);
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Qualification' }).click();

  const budgetEvidenceSelect = page.locator('p-select[name="budgetEvidence"]');
  await expect(budgetEvidenceSelect).toBeVisible();
});
