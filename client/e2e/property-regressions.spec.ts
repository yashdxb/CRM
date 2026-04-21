import * as path from 'path';
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
const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';
const SAMPLE_PHOTO_PATH = process.env.E2E_PROPERTY_PHOTO_PATH ?? path.join(__dirname, '../src/assets/avatars/lead1.png');

type PropertyRecord = {
  id: string;
  address: string;
  city?: string;
  province?: string;
  currency?: string;
};

type UserRecord = {
  id: string;
  email: string;
  temporaryPassword: string;
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

async function getPropertyResponseStatus(token: string, propertyId: string) {
  const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });

  return response.status;
}

async function createPropertyShowing(token: string, propertyId: string) {
  const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/showings`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({
      visitorName: 'Delete Flow Visitor',
      visitorEmail: 'delete.flow.visitor@example.com',
      visitorPhone: '+1 (416) 555-0177',
      scheduledAtUtc: '2026-03-21T14:00:00.000Z',
      durationMinutes: 30,
      status: 'Scheduled'
    })
  });

  expect(response.ok).toBeTruthy();
}

async function createPropertyDocument(token: string, propertyId: string) {
  const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/documents`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({
      fileName: 'delete-flow-contract.pdf',
      category: 'Contract',
      fileUrl: 'https://example.com/docs/delete-flow-contract.pdf'
    })
  });

  expect(response.ok).toBeTruthy();
}

async function expectCreatePropertyForbidden(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/properties`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({
      address: `401 Forbidden Property Lane`,
      city: 'Toronto',
      province: 'Ontario',
      country: 'Canada',
      currency: 'CAD',
      status: 'Draft',
      propertyType: 'Detached',
      listPrice: 500000
    })
  });

  expect(response.status).toBe(403);
}

async function getRoleIdByName(token: string, roleName: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/roles`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(response.ok).toBeTruthy();
  const roles = await response.json() as Array<{ id: string; name: string }>;
  const role = roles.find((item) => item.name === roleName);
  expect(role, `Role ${roleName} should exist`).toBeTruthy();
  return role!.id;
}

async function createRestrictedUser(adminToken: string): Promise<UserRecord> {
  const supportRoleId = await getRoleIdByName(adminToken, 'Support');
  const unique = Date.now();
  const temporaryPassword = 'TempSup!123';
  const email = `uat.support.${unique}@example.com`;

  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: authHeaders(adminToken),
    body: JSON.stringify({
      fullName: `UAT Support ${unique}`,
      email,
      userAudience: 'Internal',
      timeZone: 'UTC',
      locale: 'en-US',
      monthlyQuota: null,
      isActive: true,
      roleIds: [supportRoleId],
      temporaryPassword
    })
  });

  expect(response.ok).toBeTruthy();
  const user = await response.json() as { id: string; email: string };
  return { id: user.id, email: user.email, temporaryPassword };
}

async function deleteUser(adminToken: string, userId: string) {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${adminToken}`,
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

async function setCurrencyInput(
  page: Parameters<typeof test>[0]['page'],
  selector: string,
  value: string
) {
  const input = page.locator(selector);
  await input.click();
  await input.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
  await input.press('Backspace');
  await input.pressSequentially(value);
  await input.press('Tab');
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
      await setCurrencyInput(page, '#propertyListPrice input', '829000');
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

  test('restricted role cannot access property module in UI', async ({ page }) => {
    test.setTimeout(120_000);
    attachDiagnostics(page);

    const adminToken = await apiLogin(ADMIN_EMAIL, ADMIN_PASSWORD);
    const restrictedUser = await createRestrictedUser(adminToken);

    try {
      const restrictedToken = await apiLogin(restrictedUser.email, restrictedUser.temporaryPassword);

      await loginUi(page, restrictedToken, '/app/dashboard');
      await expect(page.getByRole('heading', { name: 'Command Center' })).toBeVisible();
      await expect(page.getByRole('link', { name: /^Properties$/i })).toHaveCount(0);

      await page.goto(`${UI_BASE_URL}/app/properties`);
      await expect(page).toHaveURL(/\/app\/access-denied/);
      await expect(page.getByRole('heading', { name: /Access denied/i })).toBeVisible();
      await expect(page.getByText(/You are signed in, but you do not have permission to open Properties/i)).toBeVisible();
    } finally {
      await deleteUser(adminToken, restrictedUser.id);
    }
  });

  test('restricted role cannot create property via API', async () => {
    test.setTimeout(120_000);
    const adminToken = await apiLogin(ADMIN_EMAIL, ADMIN_PASSWORD);
    const restrictedUser = await createRestrictedUser(adminToken);

    try {
      const restrictedToken = await apiLogin(restrictedUser.email, restrictedUser.temporaryPassword);
      await expectCreatePropertyForbidden(restrictedToken);
    } finally {
      await deleteUser(adminToken, restrictedUser.id);
    }
  });

  test('full listing execution flow persists across tabs and manager review', async ({ browser, page }) => {
    test.setTimeout(180_000);
    attachDiagnostics(page);

    const repToken = await apiLogin(SALES_REP_EMAIL, SALES_REP_PASSWORD);
    const managerToken = await apiLogin(SALES_MANAGER_EMAIL, SALES_MANAGER_PASSWORD);
    const property = await createProperty(repToken, 'Full Listing Flow', 855000);

    try {
      await loginUi(page, repToken, `/app/properties/${property.id}`);
      await expect(page.getByRole('heading', { name: property.address })).toBeVisible();

      await page.getByRole('link', { name: /Edit/i }).click();
      await page.locator('.photo-drop-zone .drop-input').setInputFiles(SAMPLE_PHOTO_PATH);
      await page.locator('#propertyVirtualTour').fill('https://tour.example.com/full-listing-flow');
      await page.getByRole('button', { name: /Update property/i }).click();
      await expect(page).toHaveURL(/\/app\/properties$/);

      const propertyRow = page.getByRole('row', { name: new RegExp(property.address) });
      await expect(propertyRow).toBeVisible();
      await propertyRow.click();
      await expect(page.getByRole('heading', { name: property.address })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Photos & Media/i })).toBeVisible();
      await expect(page.locator('.gallery-item img').first()).toBeVisible();

      await page.getByRole('button', { name: /Documents/i }).click();
      await page.getByRole('button', { name: /Upload Document/i }).last().click();
      await page.locator('#doc-name').fill('listing-agreement.pdf');
      await page.locator('#doc-category .p-select-dropdown, #doc-category button[aria-label=\"dropdown trigger\"]').click();
      await page.getByRole('option', { name: /Contract/i }).click();
      await page.locator('#doc-url').fill('https://example.com/docs/full-listing-agreement.pdf');
      await page.locator('.p-dialog:has(#doc-name) .p-dialog-footer .action-btn--add').click();
      await expect(page.locator('.document-card', { hasText: 'listing-agreement.pdf' }).first()).toBeVisible();

      await page.getByRole('button', { name: /Showings/i }).click();
      await page.getByRole('button', { name: /Schedule Showing/i }).click();
      await page.locator('#showing-visitor').fill('Emma Clarke');
      await page.locator('#showing-email').fill('emma.clarke@example.com');
      await page.locator('#showing-phone').fill('+1 (416) 555-0138');
      await page.locator('#showing-date').fill('2026-03-18T15:00');
      await page.locator('#showing-duration').fill('45');
      await page.locator('.p-dialog:has(#showing-visitor) .p-dialog-footer .action-btn--add').click();
      await expect(page.getByRole('button', { name: /Showings 1/i })).toBeVisible();

      await page.getByRole('button', { name: /Activities/i }).click();
      await page.getByRole('button', { name: /Add Activity/i }).click();
      await page.locator('#activity-type .p-select-dropdown, #activity-type button[aria-label=\"dropdown trigger\"]').click();
      await page.getByRole('option', { name: /Follow Up/i }).click();
      await page.getByRole('textbox', { name: /Subject/i }).fill('Confirm offer review window');
      await page.getByRole('textbox', { name: /^Description$/i }).fill('Call the buyer after the showing to confirm the offer review timeline.');
      await page.getByRole('button', { name: /Create/i }).click();
      await expect(page.getByRole('button', { name: /Activities 1/i })).toBeVisible();

      await page.getByRole('link', { name: /Edit/i }).click();
      await setCurrencyInput(page, '#propertyListPrice input', '839000');
      await page.getByRole('button', { name: /Update property/i }).click();
      await expect(page).toHaveURL(/\/app\/properties$/);
      await page.getByRole('row', { name: new RegExp(property.address) }).click();
      await expect(page.locator('.hero-price-value')).toHaveText('CA$839,000');
      await expect(page.getByRole('button', { name: /Price History 1/i })).toBeVisible();

      await page.getByRole('button', { name: /Alerts/i }).click();
      await page.getByRole('button', { name: /Add Alert Rule/i }).click();
      await page.locator('#alert-client-name').fill('Sophia Turner');
      await page.locator('#alert-client-email').fill('sophia.turner@example.com');
      await page.locator('#alert-min-price input').fill('800000');
      await page.locator('#alert-max-price input').fill('850000');
      await page.locator('#alert-bedrooms input').fill('2');
      await page.getByRole('button', { name: /Create Rule/i }).click();
      await expect(page.getByRole('button', { name: /Alerts 1/i })).toBeVisible();

      await page.getByRole('button', { name: /Change Status/i }).click();
      await page.locator('#status-select .p-select-dropdown, #status-select button[aria-label=\"dropdown trigger\"]').click();
      await page.getByRole('option', { name: /^Active$/ }).click();
      await page.locator('.p-dialog:has(#status-select) .p-dialog-footer .action-btn--add').click();
      await expect(page.locator('.hero-badge')).toHaveText('Active');

      const managerContext = await browser.newContext();
      const managerPage = await managerContext.newPage();
      attachDiagnostics(managerPage);
      await loginUi(managerPage, managerToken, `/app/properties/${property.id}`);
      await expect(managerPage.locator('.hero-badge')).toHaveText('Active');
      await expect(managerPage.locator('.hero-price-value')).toHaveText('CA$839,000');
      await expect(managerPage.getByRole('heading', { name: /Photos & Media/i })).toBeVisible();
      await expect(managerPage.locator('.gallery-item img').first()).toBeVisible();
      await expect(managerPage.getByRole('button', { name: /Documents/i })).toBeVisible();
      await expect(managerPage.getByRole('button', { name: /Showings 1/i })).toBeVisible();
      await expect(managerPage.getByRole('button', { name: /Activities 1/i })).toBeVisible();
      await expect(managerPage.getByRole('button', { name: /Price History 1/i })).toBeVisible();
      await expect(managerPage.getByRole('button', { name: /Alerts 1/i })).toBeVisible();
      await managerPage.getByRole('button', { name: /Documents/i }).click();
      await expect(managerPage.locator('.document-card', { hasText: 'listing-agreement.pdf' }).first()).toBeVisible();
      await managerPage.getByRole('button', { name: /Showings 1/i }).click();
      await expect(managerPage.locator('.showings-table .table-row', { hasText: 'Emma Clarke' }).first()).toBeVisible();
      await managerPage.getByRole('button', { name: /Activities 1/i }).click();
      await expect(managerPage.locator('.activity-item', { hasText: 'Confirm offer review window' }).first()).toBeVisible();
      await managerPage.getByRole('button', { name: /Price History 1/i }).click();
      await expect(managerPage.locator('.price-to').first()).toHaveText('CA$839,000');
      await managerPage.getByRole('button', { name: /Alerts 1/i }).click();
      await expect(managerPage.locator('.alert-rule-card', { hasText: 'Sophia Turner' }).first()).toBeVisible();
      await managerContext.close();
    } finally {
      await deleteProperty(repToken, property.id);
    }
  });

  test('delete flow archives property and removes access for rep and manager', async ({ browser, page }) => {
    test.setTimeout(120_000);
    attachDiagnostics(page);

    const repToken = await apiLogin(SALES_REP_EMAIL, SALES_REP_PASSWORD);
    const managerToken = await apiLogin(SALES_MANAGER_EMAIL, SALES_MANAGER_PASSWORD);
    const property = await createProperty(repToken, `Delete Flow ${Date.now()}`, 745000);

    await createPropertyShowing(repToken, property.id);
    await createPropertyDocument(repToken, property.id);

    await loginUi(page, repToken, '/app/properties');
    await expect(page.getByRole('heading', { name: /Property Workspace/i })).toBeVisible();

    const propertyRow = page.getByRole('row', { name: new RegExp(property.address) });
    await expect(propertyRow).toBeVisible();

    await propertyRow.locator('.row-action-btn--delete').click({ force: true });
    await page.locator('.p-confirmdialog .p-confirmdialog-accept-button, .p-confirmdialog .p-confirm-dialog-accept').click();

    await expect(page.getByText(/Property deleted\./i)).toBeVisible();
    await expect(page.getByRole('row', { name: new RegExp(property.address) })).toHaveCount(0);

    await page.goto(`${UI_BASE_URL}/app/properties/${property.id}`);
    await expect(page).toHaveURL(/\/app\/properties$/);

    const managerContext = await browser.newContext();
    const managerPage = await managerContext.newPage();
    attachDiagnostics(managerPage);
    await loginUi(managerPage, managerToken, '/app/properties');
    await expect(managerPage.getByRole('row', { name: new RegExp(property.address) })).toHaveCount(0);
    await managerPage.goto(`${UI_BASE_URL}/app/properties/${property.id}`);
    await expect(managerPage).toHaveURL(/\/app\/properties$/);
    await managerContext.close();

    await expect(await getPropertyResponseStatus(repToken, property.id)).toBe(404);
    await expect(await getPropertyResponseStatus(managerToken, property.id)).toBe(404);
  });

  test('bulk status change stays consistent across table and board views for rep and manager', async ({ browser, page }) => {
    test.setTimeout(120_000);
    attachDiagnostics(page);

    const repToken = await apiLogin(SALES_REP_EMAIL, SALES_REP_PASSWORD);
    const managerToken = await apiLogin(SALES_MANAGER_EMAIL, SALES_MANAGER_PASSWORD);
    const propertyA = await createProperty(repToken, `Bulk Status A ${Date.now()}`, 721000);
    const propertyB = await createProperty(repToken, `Bulk Status B ${Date.now()}`, 731000);

    try {
      await loginUi(page, repToken, '/app/properties');
      await expect(page.getByRole('heading', { name: /Property Workspace/i })).toBeVisible();

      const rowA = page.getByRole('row', { name: new RegExp(propertyA.address) });
      const rowB = page.getByRole('row', { name: new RegExp(propertyB.address) });
      await expect(rowA).toBeVisible();
      await expect(rowB).toBeVisible();

      await rowA.locator('input[type="checkbox"]').check();
      await rowB.locator('input[type="checkbox"]').check();
      await expect(page.locator('.bulk-count')).toHaveText('2 selected');

      await page.getByRole('button', { name: /Change Status/i }).click();
      await page.locator('#bulk-status .p-select-dropdown, #bulk-status button[aria-label=\"dropdown trigger\"]').click();
      await page.getByRole('option', { name: /^Conditional$/ }).click();
      await page.locator('.p-dialog:has(#bulk-status) .action-btn--add').click();

      await expect(page.getByText(/2 properties updated\./i)).toBeVisible();
      await expect(page.locator('.bulk-toolbar')).toHaveCount(0);
      await expect(rowA.getByText('Conditional')).toBeVisible();
      await expect(rowB.getByText('Conditional')).toBeVisible();

      await page.getByRole('button', { name: /Switch to board view/i }).click();
      const conditionalColumn = page.locator('.kanban-column', { hasText: /^Conditional/s });
      await expect(conditionalColumn.locator('.property-card', { hasText: propertyA.address })).toBeVisible();
      await expect(conditionalColumn.locator('.property-card', { hasText: propertyB.address })).toBeVisible();

      const managerContext = await browser.newContext();
      const managerPage = await managerContext.newPage();
      attachDiagnostics(managerPage);
      await loginUi(managerPage, managerToken, '/app/properties');
      await expect(managerPage.getByRole('row', { name: new RegExp(propertyA.address) }).getByText('Conditional')).toBeVisible();
      await expect(managerPage.getByRole('row', { name: new RegExp(propertyB.address) }).getByText('Conditional')).toBeVisible();
      await managerPage.getByRole('button', { name: /Switch to board view/i }).click();
      const managerConditionalColumn = managerPage.locator('.kanban-column', { hasText: /^Conditional/s });
      await expect(managerConditionalColumn.locator('.property-card', { hasText: propertyA.address })).toBeVisible();
      await expect(managerConditionalColumn.locator('.property-card', { hasText: propertyB.address })).toBeVisible();
      await managerContext.close();
    } finally {
      await deleteProperty(repToken, propertyA.id);
      await deleteProperty(repToken, propertyB.id);
    }
  });

  test('photo media lifecycle stays consistent after upload and removal for rep and manager', async ({ browser, page }) => {
    test.setTimeout(120_000);
    attachDiagnostics(page);

    const repToken = await apiLogin(SALES_REP_EMAIL, SALES_REP_PASSWORD);
    const managerToken = await apiLogin(SALES_MANAGER_EMAIL, SALES_MANAGER_PASSWORD);
    const property = await createProperty(repToken, `Photo Lifecycle ${Date.now()}`, 712000);

    try {
      await loginUi(page, repToken, `/app/properties/${property.id}/edit`);
      await expect(page.getByRole('heading', { name: /Edit Property/i })).toBeVisible();

      await page.locator('.photo-drop-zone .drop-input').setInputFiles([SAMPLE_PHOTO_PATH, SAMPLE_PHOTO_PATH]);
      await expect(page.locator('.photo-grid').last().locator('.photo-thumb')).toHaveCount(2);
      await page.getByRole('button', { name: /Update property/i }).click();
      await expect(page).toHaveURL(/\/app\/properties$/);

      await page.getByRole('row', { name: new RegExp(property.address) }).click();
      await expect(page.locator('.gallery-item')).toHaveCount(2);

      const managerContext = await browser.newContext();
      const managerPage = await managerContext.newPage();
      attachDiagnostics(managerPage);
      await loginUi(managerPage, managerToken, `/app/properties/${property.id}`);
      await expect(managerPage.locator('.gallery-item')).toHaveCount(2);
      await managerContext.close();

      await page.getByRole('link', { name: /Edit/i }).click();
      await expect(page.locator('.photo-grid').first().locator('.photo-thumb')).toHaveCount(2);
      await page.locator('.photo-grid').first().locator('.photo-thumb').first().locator('.photo-remove').click();
      await expect(page.getByText(/Photo removed\./i)).toBeVisible();
      await expect(page.locator('.photo-grid').first().locator('.photo-thumb')).toHaveCount(1);

      await page.goto(`${UI_BASE_URL}/app/properties/${property.id}`);
      await expect(page.locator('.gallery-item')).toHaveCount(1);

      const managerContextAfterRemoval = await browser.newContext();
      const managerPageAfterRemoval = await managerContextAfterRemoval.newPage();
      attachDiagnostics(managerPageAfterRemoval);
      await loginUi(managerPageAfterRemoval, managerToken, `/app/properties/${property.id}`);
      await expect(managerPageAfterRemoval.locator('.gallery-item')).toHaveCount(1);
      await managerContextAfterRemoval.close();
    } finally {
      await deleteProperty(repToken, property.id);
    }
  });
});
