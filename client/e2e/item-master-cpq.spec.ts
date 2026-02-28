import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function login(page: any, request: any) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  expect(response.ok()).toBeTruthy();
  const payload = await response.json();
  expect(payload?.accessToken).toBeTruthy();

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);

  return payload.accessToken as string;
}

test('item master CRUD and inactive item is excluded from quote picker', async ({ page, request }) => {
  const token = await login(page, request);
  const headers = {
    Authorization: `Bearer ${token}`,
    'X-Tenant-Key': 'default',
    'Content-Type': 'application/json'
  };

  const suffix = Date.now();
  const sku = `E2E-CAT-${suffix}`;
  const itemName = `E2E Catalog Item ${suffix}`;

  await page.goto('/app/supply-chain/catalog/item-master', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Add item' }).click();
  const itemDialog = page.locator('.p-dialog:visible').last();
  await expect(itemDialog).toBeVisible();
  await page.locator('#itemSku').fill(sku);
  await page.locator('#itemName').fill(itemName);
  await page.locator('#itemCategory').fill('Automation');
  await page.locator('#itemUom').fill('Each');
  await page.locator('#itemDescription').fill('E2E item master test item');
  const createResponsePromise = page.waitForResponse((response) =>
    response.url().includes('/api/supply-chain/item-master') && response.request().method() === 'POST'
  );
  await itemDialog.getByRole('button', { name: 'Save' }).click();
  const createResponse = await createResponsePromise;
  if (!createResponse.ok()) {
    throw new Error(`Create item failed (${createResponse.status()}): ${await createResponse.text()}`);
  }

  const searchInput = page.locator('input[placeholder*="Search by SKU"]').first();
  await searchInput.fill(sku);
  await searchInput.press('Enter');
  await expect(page.locator('tbody tr', { hasText: sku }).first()).toBeVisible();

  const row = page.locator('tbody tr', { hasText: sku }).first();
  await row.locator('.row-actions button').nth(0).click();
  await expect(itemDialog).toBeVisible();
  await page.locator('#itemName').fill(`${itemName} Updated`);
  const updateResponsePromise = page.waitForResponse((response) =>
    response.url().includes('/api/supply-chain/item-master/') && response.request().method() === 'PUT'
  );
  await itemDialog.getByRole('button', { name: 'Save' }).click();
  const updateResponse = await updateResponsePromise;
  if (!updateResponse.ok()) {
    throw new Error(`Update item failed (${updateResponse.status()}): ${await updateResponse.text()}`);
  }
  if (await page.locator('.p-dialog:visible').count()) {
    await page.locator('.p-dialog:visible').last().getByRole('button', { name: 'Cancel' }).click();
  }
  await expect(page.locator('tbody tr', { hasText: sku }).first()).toBeVisible();

  const updatedRow = page.locator('tbody tr', { hasText: sku }).first();
  await updatedRow.locator('.row-actions button').nth(1).click();

  const statusSelect = page.locator('p-select').filter({ hasText: 'All statuses' }).first();
  await statusSelect.click();
  await page.getByRole('option', { name: /^Active$/ }).click();
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(page.locator('tbody tr', { hasText: sku })).toHaveCount(0);

  const customerResp = await request.post(`${API_BASE_URL}/api/customers`, {
    headers,
    data: {
      name: `E2E CPQ Customer ${suffix}`,
      lifecycleStage: 'Customer'
    }
  });
  expect(customerResp.ok()).toBeTruthy();
  const customer = await customerResp.json();
  const accountId = customer.id as string;

  const closeDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString();
  const opportunityResp = await request.post(`${API_BASE_URL}/api/opportunities`, {
    headers,
    data: {
      name: `E2E CPQ Opp ${suffix}`,
      accountId,
      stageName: 'Proposal',
      amount: 1000,
      currency: 'USD',
      probability: 50,
      expectedCloseDate: closeDate,
      summary: 'E2E summary',
      requirements: 'E2E requirements',
      buyingProcess: 'E2E buying process',
      successCriteria: 'E2E success criteria'
    }
  });
  expect(opportunityResp.ok()).toBeTruthy();
  const opportunity = await opportunityResp.json();
  const opportunityId = opportunity.id as string;

  await page.goto(`/app/opportunities/${opportunityId}/edit`, { waitUntil: 'domcontentloaded' });
  const quoteHeader = page.locator('.opportunity-accordion-header', { hasText: 'Quote / Proposal' }).first();
  await quoteHeader.click();
  const quoteRegion = page.getByRole('region', { name: /Quote \/ Proposal/i }).first();
  await quoteRegion.getByRole('button', { name: /Add line/i }).click();
  const itemSelect = quoteRegion.getByRole('combobox').last();
  await expect(itemSelect).toBeVisible();
  await itemSelect.click();
  await expect(page.getByRole('option', { name: new RegExp(sku, 'i') })).toHaveCount(0);
});
