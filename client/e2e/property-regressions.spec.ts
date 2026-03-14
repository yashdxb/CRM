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

  test('showing subresource persists and manager can review it', async ({ browser, page }) => {
    test.setTimeout(120_000);
    attachDiagnostics(page);

    const repToken = await apiLogin(SALES_REP_EMAIL, SALES_REP_PASSWORD);
    const managerToken = await apiLogin(SALES_MANAGER_EMAIL, SALES_MANAGER_PASSWORD);
    const property = await createProperty(repToken, 'Showing Regression', 805000);

    try {
      await loginUi(page, repToken, `/app/properties/${property.id}`);
      await expect(page.getByRole('heading', { name: property.address })).toBeVisible();

      await page.getByRole('button', { name: /Showings/i }).click();
      await page.getByRole('button', { name: /Schedule Showing/i }).click();
      await page.locator('#showing-visitor').fill('Emma Clarke');
      await page.locator('#showing-email').fill('emma.clarke@example.com');
      await page.locator('#showing-phone').fill('+1 (416) 555-0138');
      await page.locator('#showing-date').fill('2026-03-16T10:30');
      await page.locator('#showing-duration').fill('45');
      await page.locator('.p-dialog:has(#showing-visitor) .p-dialog-footer .action-btn--add').click();

      const repShowingRow = page.locator('.showings-table .table-row', { hasText: 'Emma Clarke' }).first();
      await expect(repShowingRow).toBeVisible();
      await expect(repShowingRow.getByText('Scheduled')).toBeVisible();

      const managerContext = await browser.newContext();
      const managerPage = await managerContext.newPage();
      attachDiagnostics(managerPage);
      await loginUi(managerPage, managerToken, `/app/properties/${property.id}`);
      await managerPage.getByRole('button', { name: /Showings 1/i }).click();
      const managerShowingRow = managerPage.locator('.showings-table .table-row', { hasText: 'Emma Clarke' }).first();
      await expect(managerShowingRow).toBeVisible();
      await expect(managerShowingRow.getByText('Scheduled')).toBeVisible();
      await managerContext.close();
    } finally {
      await deleteProperty(repToken, property.id);
    }
  });

  test('document subresource persists and manager can review it', async ({ browser, page }) => {
    test.setTimeout(120_000);
    attachDiagnostics(page);

    const repToken = await apiLogin(SALES_REP_EMAIL, SALES_REP_PASSWORD);
    const managerToken = await apiLogin(SALES_MANAGER_EMAIL, SALES_MANAGER_PASSWORD);
    const property = await createProperty(repToken, 'Document Regression', 795000);

    try {
      await loginUi(page, repToken, `/app/properties/${property.id}`);
      await expect(page.getByRole('heading', { name: property.address })).toBeVisible();

      await page.getByRole('button', { name: /Documents/i }).click();
      await page.getByRole('button', { name: /Upload Document/i }).click();
      await page.locator('#doc-name').fill('listing-agreement.pdf');
      await page.locator('#doc-category .p-select-dropdown, #doc-category button[aria-label=\"dropdown trigger\"]').click();
      await page.getByRole('option', { name: /Contract/i }).click();
      await page.locator('#doc-url').fill('https://example.com/docs/listing-agreement.pdf');
      await page.locator('.p-dialog:has(#doc-name) .p-dialog-footer .action-btn--add').click();

      await expect(page.getByRole('button', { name: /Documents 1/i })).toBeVisible();
      const repDocumentCard = page.locator('.document-card', { hasText: 'listing-agreement.pdf' }).first();
      await expect(repDocumentCard).toBeVisible();
      await expect(repDocumentCard.getByText('Contract')).toBeVisible();

      const managerContext = await browser.newContext();
      const managerPage = await managerContext.newPage();
      attachDiagnostics(managerPage);
      await loginUi(managerPage, managerToken, `/app/properties/${property.id}`);
      await managerPage.getByRole('button', { name: /Documents 1/i }).click();
      const managerDocumentCard = managerPage.locator('.document-card', { hasText: 'listing-agreement.pdf' }).first();
      await expect(managerDocumentCard).toBeVisible();
      await expect(managerDocumentCard.getByText('Contract')).toBeVisible();
      await managerContext.close();
    } finally {
      await deleteProperty(repToken, property.id);
    }
  });

  test('alert rule subresource persists and manager can review it', async ({ browser, page }) => {
    test.setTimeout(120_000);
    attachDiagnostics(page);

    const repToken = await apiLogin(SALES_REP_EMAIL, SALES_REP_PASSWORD);
    const managerToken = await apiLogin(SALES_MANAGER_EMAIL, SALES_MANAGER_PASSWORD);
    const property = await createProperty(repToken, 'Alert Regression', 775000);

    try {
      await loginUi(page, repToken, `/app/properties/${property.id}`);
      await expect(page.getByRole('heading', { name: property.address })).toBeVisible();

      await page.getByRole('button', { name: /Alerts/i }).click();
      await page.getByRole('button', { name: /Add Alert Rule/i }).click();
      await page.locator('#alert-client-name').fill('Sophia Turner');
      await page.locator('#alert-client-email').fill('sophia.turner@example.com');
      await page.locator('#alert-min-price input').fill('700000');
      await page.locator('#alert-max-price input').fill('800000');
      await page.locator('#alert-bedrooms input').fill('2');
      await page.getByRole('button', { name: /Create Rule/i }).click();

      const repRuleCard = page.locator('.alert-rule-card', { hasText: 'Sophia Turner' }).first();
      await expect(repRuleCard).toBeVisible();
      await expect(repRuleCard.getByText('sophia.turner@example.com')).toBeVisible();
      await expect(repRuleCard.getByText('1 matches')).toBeVisible();
      await expect(page.getByText('Notification History')).toBeVisible();
      await expect(page.locator('.notification-item', { hasText: 'Sophia Turner' }).first()).toBeVisible();

      const managerContext = await browser.newContext();
      const managerPage = await managerContext.newPage();
      attachDiagnostics(managerPage);
      await loginUi(managerPage, managerToken, `/app/properties/${property.id}`);
      await managerPage.getByRole('button', { name: /Alerts/i }).click();
      const managerRuleCard = managerPage.locator('.alert-rule-card', { hasText: 'Sophia Turner' }).first();
      await expect(managerRuleCard).toBeVisible();
      await expect(managerRuleCard.getByText('sophia.turner@example.com')).toBeVisible();
      await expect(managerPage.locator('.notification-item', { hasText: 'Sophia Turner' }).first()).toBeVisible();
      await managerContext.close();
    } finally {
      await deleteProperty(repToken, property.id);
    }
  });

  test('status progression persists across lifecycle stages and manager can review it', async ({ browser, page }) => {
    test.setTimeout(120_000);
    attachDiagnostics(page);

    const repToken = await apiLogin(SALES_REP_EMAIL, SALES_REP_PASSWORD);
    const managerToken = await apiLogin(SALES_MANAGER_EMAIL, SALES_MANAGER_PASSWORD);
    const property = await createProperty(repToken, 'Status Regression', 765000);

    const changeStatus = async (statusLabel: 'Active' | 'Conditional' | 'Sold') => {
      await page.getByRole('button', { name: /Change Status/i }).click();
      await page.locator('#status-select .p-select-dropdown, #status-select button[aria-label=\"dropdown trigger\"]').click();
      await page.getByRole('option', { name: new RegExp(`^${statusLabel}$`) }).click();
      await page.locator('.p-dialog:has(#status-select) .p-dialog-footer .action-btn--add').click();
      await expect(page.locator('.hero-badge')).toHaveText(statusLabel);
    };

    try {
      await loginUi(page, repToken, `/app/properties/${property.id}`);
      await expect(page.getByRole('heading', { name: property.address })).toBeVisible();
      await expect(page.locator('.hero-badge')).toHaveText('Draft');

      await changeStatus('Active');
      await changeStatus('Conditional');
      await changeStatus('Sold');

      await expect(page.locator('.timeline-label', { hasText: 'Status changed to Active' }).first()).toBeVisible();
      await expect(page.locator('.timeline-label', { hasText: 'Status changed to Conditional' }).first()).toBeVisible();
      await expect(page.locator('.timeline-label', { hasText: 'Status changed to Sold' }).first()).toBeVisible();

      const managerContext = await browser.newContext();
      const managerPage = await managerContext.newPage();
      attachDiagnostics(managerPage);
      await loginUi(managerPage, managerToken, `/app/properties/${property.id}`);
      await expect(managerPage.locator('.hero-badge')).toHaveText('Sold');
      await expect(managerPage.locator('.timeline-label', { hasText: 'Status changed to Active' }).first()).toBeVisible();
      await expect(managerPage.locator('.timeline-label', { hasText: 'Status changed to Conditional' }).first()).toBeVisible();
      await expect(managerPage.locator('.timeline-label', { hasText: 'Status changed to Sold' }).first()).toBeVisible();
      await managerContext.close();
    } finally {
      await deleteProperty(repToken, property.id);
    }
  });
});
