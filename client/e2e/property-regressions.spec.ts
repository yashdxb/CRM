import { expect, test } from '@playwright/test';

const UI_BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const API_BASE_URL =
  process.env.API_BASE_URL
  ?? ((UI_BASE_URL.includes('localhost') || UI_BASE_URL.includes('127.0.0.1'))
    ? 'http://127.0.0.1:5014'
    : (process.env.E2E_API_URL ?? 'https://crm-enterprise-api-dev-01122345.azurewebsites.net'));
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'P@ssw0rd!';
const SALES_MANAGER_EMAIL = process.env.E2E_SALES_MANAGER_EMAIL ?? 'yasser.ahamed@gmail.com';
const SALES_MANAGER_PASSWORD = process.env.E2E_SALES_MANAGER_PASSWORD ?? 'P@ssw0rd!';

type PropertyRecord = {
  id: string;
  address: string;
  city?: string;
  province?: string;
  currency?: string;
};

async function apiLogin(email: string, password: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    body: JSON.stringify({ email, password })
  });

  const raw = await response.text();
  let payload: Record<string, unknown> | null = null;
  try {
    payload = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    payload = null;
  }

  expect(
    payload?.accessToken,
    `Login should succeed for ${email}. Status=${response.status}. Body=${raw.slice(0, 400)}`
  ).toBeTruthy();
  return payload.accessToken as string;
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-Tenant-Key': 'default'
  };
}

async function createProperty(token: string, addressSuffix: string, listPrice = 845000) {
  const response = await fetch(`${API_BASE_URL}/api/properties`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({
      address: `201 ${addressSuffix} Birch Street`,
      city: 'Toronto',
      province: 'Ontario',
      postalCode: 'M4B 1B3',
      country: 'Canada',
      neighborhood: 'Leslieville',
      mlsNumber: `UAT-${Date.now()}`,
      currency: 'CAD',
      status: 'Draft',
      propertyType: 'Detached',
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1180,
      listPrice,
      description: 'Property regression test seed.',
      features: 'Roof deck, parking, renovated kitchen'
    })
  });

  expect(response.ok).toBeTruthy();
  return (await response.json()) as PropertyRecord;
}

async function deleteProperty(token: string, propertyId: string) {
  const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });

  expect([204, 404]).toContain(response.status);
}

async function loginUi(page: Parameters<typeof test>[0]['page'], token: string, path: string) {
  await page.goto(`${UI_BASE_URL}/login`);
  await page.evaluate(([accessToken]) => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('auth_token', accessToken as string);
    localStorage.setItem('tenant_key', 'default');
  }, [token]);
  await page.goto(`${UI_BASE_URL}${path}`);
}

function attachDiagnostics(page: Parameters<typeof test>[0]['page']) {
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

test.describe('Property UAT regressions', () => {
  test('price edit creates price history and manager can review it', async ({ browser, page }) => {
    test.setTimeout(120_000);
    attachDiagnostics(page);

    const repToken = await apiLogin(SALES_REP_EMAIL, SALES_REP_PASSWORD);
    const managerToken = await apiLogin(SALES_MANAGER_EMAIL, SALES_MANAGER_PASSWORD);
    const property = await createProperty(repToken, 'Price Regression', 845000);

    try {
      await loginUi(page, repToken, `/app/properties/${property.id}`);
      await expect(page.getByRole('heading', { name: property.address })).toBeVisible();

      await page.getByRole('link', { name: /Edit/i }).click();
      await page.locator('#propertyListPrice input').fill('829000');
      await page.getByRole('button', { name: /Update property/i }).click();
      await expect(page).toHaveURL(/\/app\/properties$/);

      const propertyRow = page.getByRole('row', { name: new RegExp(property.address) });
      await expect(propertyRow).toBeVisible();
      await propertyRow.click();
      await expect(page.locator('.hero-price-value')).toHaveText('CA$829,000');
      await expect(page.getByRole('button', { name: /Price History 1/i })).toBeVisible();
      await expect(page.getByText('Price updated')).toBeVisible();

      await page.getByRole('button', { name: /Price History/i }).click();
      await expect(page.locator('.price-from').first()).toHaveText('CA$845,000');
      await expect(page.locator('.price-to').first()).toHaveText('CA$829,000');

      const managerContext = await browser.newContext();
      const managerPage = await managerContext.newPage();
      attachDiagnostics(managerPage);
      await loginUi(managerPage, managerToken, `/app/properties/${property.id}`);
      await expect(managerPage.locator('.hero-price-value')).toHaveText('CA$829,000');
      await managerPage.getByRole('button', { name: /Price History 1/i }).click();
      await expect(managerPage.locator('.price-from').first()).toHaveText('CA$845,000');
      await expect(managerPage.locator('.price-to').first()).toHaveText('CA$829,000');
      await managerContext.close();
    } finally {
      await deleteProperty(repToken, property.id);
    }
  });

  test('follow up activity persists as Follow Up and manager can see it', async ({ browser, page }) => {
    test.setTimeout(120_000);
    attachDiagnostics(page);

    const repToken = await apiLogin(SALES_REP_EMAIL, SALES_REP_PASSWORD);
    const managerToken = await apiLogin(SALES_MANAGER_EMAIL, SALES_MANAGER_PASSWORD);
    const property = await createProperty(repToken, 'Follow Up Regression', 815000);

    try {
      await loginUi(page, repToken, `/app/properties/${property.id}`);
      await expect(page.getByRole('heading', { name: property.address })).toBeVisible();

      await page.getByRole('button', { name: /Activities/i }).click();
      await page.getByRole('button', { name: /Add Activity/i }).click();
      await page.locator('#activity-type .p-select-dropdown, #activity-type button[aria-label=\"dropdown trigger\"]').click();
      await page.getByRole('option', { name: /Follow Up/i }).click();
      await page.getByRole('textbox', { name: /Subject/i }).fill('Follow up on staging feedback');
      await page.getByRole('textbox', { name: /^Description$/i }).fill('Call buyer after the weekend open house to capture staging feedback.');
      await page.getByRole('button', { name: /Create/i }).click();

      const repActivityCard = page.locator('.activity-item', { hasText: 'Follow up on staging feedback' }).first();
      await expect(repActivityCard).toBeVisible();
      await expect(repActivityCard.getByText('Follow Up', { exact: true })).toBeVisible();
      await expect(page.getByText('FollowUp')).toHaveCount(0);

      const managerContext = await browser.newContext();
      const managerPage = await managerContext.newPage();
      attachDiagnostics(managerPage);
      await loginUi(managerPage, managerToken, `/app/properties/${property.id}`);
      await managerPage.getByRole('button', { name: /Activities/i }).click();
      const managerActivityCard = managerPage.locator('.activity-item', { hasText: 'Follow up on staging feedback' }).first();
      await expect(managerActivityCard).toBeVisible();
      await expect(managerActivityCard.getByText('Follow Up', { exact: true })).toBeVisible();
      await expect(managerPage.getByText('FollowUp')).toHaveCount(0);
      await managerContext.close();
    } finally {
      await deleteProperty(repToken, property.id);
    }
  });
});
