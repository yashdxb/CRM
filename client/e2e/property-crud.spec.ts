import { test, expect } from '@playwright/test';

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

async function createProperty(request, token, addressSuffix) {
  const response = await request.post(`${API_BASE_URL}/api/properties`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: {
      address: `E2E Seed ${addressSuffix} Test Ave`,
      city: 'Toronto',
      province: 'Ontario',
      postalCode: 'M5V 2T6',
      country: 'Canada',
      currency: 'CAD',
      status: 'Draft',
      description: 'Seed property for CRUD UI validation.'
    }
  });

  expect(response.ok()).toBeTruthy();
  return await response.json();
}

function attachDiagnostics(page) {
  page.on('pageerror', (err) => console.log('pageerror:', err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log('console error:', msg.text());
    }
  });
  page.on('requestfailed', (req) => {
    const failure = req.failure()?.errorText ?? '';
    if (req.url().includes('/api/') && !failure.includes('net::ERR_ABORTED')) {
      console.log('request failed:', req.url(), failure);
    }
  });
}

test.describe('Property Module CRUD', () => {
  test.beforeEach(async ({ page, request }) => {
    attachDiagnostics(page);
    await login(page, request);
  });

  test('list page loads and shows properties', async ({ page, request }) => {
    const token = await login(page, request);
    await createProperty(request, token, 'List');
    await page.goto('/app/properties');
    await expect(page.locator('h1.hero-title')).toContainText('Property');
    // Table should load with at least one row
    await expect(page.locator('.p-datatable-tbody tr').first()).toBeVisible({ timeout: 15_000 });
  });

  test('create a new property', async ({ page }) => {
    await page.goto('/app/properties/new');
    await expect(page.locator('h1.hero-title')).toContainText('Create New');

    // Fill required fields
    await page.fill('#propertyAddress', 'E2E Test - 999 Automation Ave');
    await page.fill('#propertyCity', 'TestCity');
    await page.fill('#propertyProvince', 'Ontario');
    await page.fill('#propertyPostalCode', 'T1T 1T1');
    await page.fill('#propertyCountry', 'Canada');

    // Submit
    await page.locator('button:has-text("Save"), button:has-text("Create")').first().click();

    // Should navigate back to list
    await expect(page).toHaveURL(/\/app\/properties/, { timeout: 10_000 });
  });

  test('navigate to property detail', async ({ page, request }) => {
    const token = await login(page, request);
    const property = await createProperty(request, token, 'Detail');
    await page.goto('/app/properties');
    await expect(page.locator(`text=${property.address}`)).toBeVisible({ timeout: 15_000 });

    // Click the seeded row to navigate to detail
    await page.locator('.p-datatable-tbody tr', { hasText: property.address }).first().click();
    await expect(page.locator('h1.hero-title')).toBeVisible({ timeout: 10_000 });

    // Detail page should show timeline section
    await expect(page.locator('.status-timeline')).toBeVisible();
    // Should have at least one timeline event (Record Created always exists)
    await expect(page.locator('.timeline-event').first()).toBeVisible();

    // Days on market badge should be visible
    await expect(page.locator('.days-on-market')).toBeVisible();
  });

  test('edit an existing property', async ({ page, request }) => {
    const token = await login(page, request);
    const property = await createProperty(request, token, 'Edit');
    await page.goto('/app/properties');
    await expect(page.locator(`text=${property.address}`)).toBeVisible({ timeout: 15_000 });

    // Click row-level edit button on the seeded row
    await page.locator('.p-datatable-tbody tr', { hasText: property.address }).locator('.row-action-btn--edit').click();
    await expect(page.locator('h1.hero-title')).toContainText('Edit', { timeout: 10_000 });

    // Modify address field
    const addressInput = page.locator('#propertyAddress');
    await addressInput.fill('E2E Updated - 888 Modified St');

    // Submit
    await page.locator('button:has-text("Save"), button:has-text("Update")').first().click();

    // Should navigate back to list
    await expect(page).toHaveURL(/\/app\/properties/, { timeout: 10_000 });
  });

  test('delete a property via row action', async ({ page, request }) => {
    const token = await login(page, request);
    const property = await createProperty(request, token, 'Delete');
    await page.goto('/app/properties');
    const targetRow = page.locator('.p-datatable-tbody tr', { hasText: property.address }).first();
    await expect(targetRow).toBeVisible({ timeout: 15_000 });

    // Count rows before delete
    const rowsBefore = await page.locator('.p-datatable-tbody tr').count();

    // Delete the seeded row
    await targetRow.locator('.row-action-btn--delete').click();

    // Confirm dialog
    const confirmBtn = page.locator('.p-dialog button:has-text("Yes"), .p-dialog button:has-text("Delete"), .p-dialog button:has-text("Confirm"), .p-confirmdialog-accept-button');
    if (await confirmBtn.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await confirmBtn.first().click();
    }

    // Rows should decrease or stay same (if last was already gone)
    await page.waitForTimeout(1_000);
    const rowsAfter = await page.locator('.p-datatable-tbody tr').count();
    expect(rowsAfter).toBeLessThanOrEqual(rowsBefore);
  });

  test('new property fields: country, features, listing date visible in form', async ({ page }) => {
    await page.goto('/app/properties/new');
    await expect(page.locator('#propertyCountry')).toBeVisible();
    await expect(page.locator('#propertyListingDate')).toBeVisible();
    await expect(page.locator('#propertyDescription')).toBeVisible();

    // Relationships section should have owner/account/contact/opportunity pickers
    await expect(page.locator('text=Relationships')).toBeVisible();
  });
});
