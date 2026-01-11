import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = 'ChangeThisAdmin!1';

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
  }, payload.accessToken);
  await page.goto('/app/dashboard');
  return payload.accessToken as string;
}

async function openSelect(page, selector) {
  const selectHost = page.locator(selector);
  const trigger = selectHost.locator('.p-select');
  if (await trigger.count()) {
    await trigger.click();
  } else {
    await selectHost.click();
  }
}

async function selectFirstOption(page, selector) {
  await openSelect(page, selector);
  const options = page.locator(
    '.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]'
  );
  await options.first().waitFor({ state: 'visible' });
  await options.first().click({ force: true });
}

async function selectByLabel(page, selector, optionText) {
  await openSelect(page, selector);
  const options = page.locator(
    '.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]'
  );
  const option = options.filter({ hasText: optionText }).first();
  await option.waitFor({ state: 'visible' });
  await option.click({ force: true });
}

async function searchLeads(page, term) {
  const input = page.locator('.search-box input');
  await input.waitFor({ state: 'visible' });
  await input.fill(term);
  await page.waitForTimeout(300);
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

test('lead lifecycle UI smoke', async ({ page, request }) => {
  const suffix = Date.now();
  const manualLead = `Manual UI ${suffix}`;
  const roundLead = `Round UI ${suffix}`;
  const territoryLead = `Territory UI ${suffix}`;

  attachDiagnostics(page);

  const token = await login(page, request);

  await page.goto('/app/settings/lead-assignment');
  await expect(page.getByRole('heading', { name: 'Assignment Rules', level: 1 })).toBeVisible();

  await page.goto('/app/leads/new');
  await page.waitForURL('**/app/leads/new');
  await page.locator('input[name="firstName"]').fill('Manual');
  await page.locator('input[name="lastName"]').fill(`UI ${suffix}`);
  await page.locator('input[name="companyName"]').fill(manualLead);
  await selectByLabel(page, 'p-select[name="assignmentStrategy"]', 'Manual');
  await selectFirstOption(page, 'p-select[name="ownerId"]');
  await expect(page.locator('button:has-text("Create lead")')).toBeEnabled();
  const [manualResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/leads') && response.request().method() === 'POST'),
    page.locator('button:has-text("Create lead")').click()
  ]);
  expect(manualResponse.ok()).toBeTruthy();
  await page.goto('/app/leads');
  await expect(page.locator('.leads-table')).toContainText(manualLead);

  await page.goto('/app/leads/new');
  await page.waitForURL('**/app/leads/new');
  await page.locator('input[name="firstName"]').fill('Round');
  await page.locator('input[name="lastName"]').fill(`UI ${suffix}`);
  await page.locator('input[name="companyName"]').fill(roundLead);
  await selectByLabel(page, 'p-select[name="assignmentStrategy"]', 'Round robin');
  const [roundResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/leads') && response.request().method() === 'POST'),
    page.locator('button:has-text("Create lead")').click()
  ]);
  expect(roundResponse.ok()).toBeTruthy();
  await page.goto('/app/leads');
  await expect(page.locator('.leads-table')).toContainText(roundLead);

  const territoryResponse = await request.post(`${API_BASE_URL}/api/leads`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    },
    data: {
      firstName: 'Territory',
      lastName: `UI ${suffix}`,
      companyName: territoryLead,
      assignmentStrategy: 'Territory',
      territory: 'EMEA',
      status: 'New'
    }
  });
  expect(territoryResponse.ok()).toBeTruthy();
  await page.goto('/app/leads');
  await searchLeads(page, territoryLead);
  await expect(page.locator('.leads-table')).toContainText(territoryLead);

  await page.goto('/app/leads');
  await searchLeads(page, manualLead);
  const manualRow = page.locator('tr').filter({ hasText: manualLead }).first();
  await manualRow.locator('button[title="Edit"]').click();
  await page.waitForURL('**/app/leads/**');
  await selectByLabel(page, 'p-select[name="status"]', 'Qualified');
  const [updateResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/leads') && response.request().method() === 'PUT'),
    page.locator('button:has-text("Update lead")').click()
  ]);
  expect(updateResponse.ok()).toBeTruthy();
  await page.locator('button:has-text("Convert lead")').first().click();
  await page.waitForURL('**/app/leads/**/convert');
  const [convertResponse] = await Promise.all([
    page.waitForResponse(
      (response) => response.url().includes('/convert') && response.request().method() === 'POST'
    ),
    page.locator('form.convert-form button:has-text("Convert lead")').click()
  ]);
  if (!convertResponse.ok()) {
    console.log('convert failed:', convertResponse.status(), await convertResponse.text());
  }
  expect(convertResponse.ok()).toBeTruthy();
  await page.waitForURL('**/app/leads');
  await expect(page.getByText('Lead converted.')).toBeVisible();
});

test('lead auto score and conversion carries owner', async ({ page, request }) => {
  const suffix = Date.now();
  const companyName = `Auto Score Co ${suffix}`;

  attachDiagnostics(page);

  const token = await login(page, request);

  await page.goto('/app/leads/new');
  await page.waitForURL('**/app/leads/new');
  await page.locator('input[name="firstName"]').fill('Auto');
  await page.locator('input[name="lastName"]').fill(`Score ${suffix}`);
  await page.locator('input[name="companyName"]').fill(companyName);
  await page.locator('input[name="email"]').fill(`auto.${suffix}@example.com`);
  await page.locator('input[name="phone"]').fill(`+1555${String(suffix).slice(-7)}`);
  await page.locator('input[name="jobTitle"]').fill('Sales Lead');
  await page.locator('input[name="source"]').fill('Web');
  await selectByLabel(page, 'p-select[name="assignmentStrategy"]', 'Manual');
  await selectFirstOption(page, 'p-select[name="ownerId"]');
  await page.locator('input[name="autoScore"]').check();

  const [createResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/leads') && response.request().method() === 'POST'),
    page.locator('button:has-text("Create lead")').click()
  ]);
  expect(createResponse.ok()).toBeTruthy();
  const createdLead = await createResponse.json();
  const leadId = createdLead?.id;
  expect(leadId).toBeTruthy();

  const leadResponse = await request.get(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: {
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    }
  });
  expect(leadResponse.ok()).toBeTruthy();
  const lead = await leadResponse.json();
  const leadOwnerId = lead.ownerId ?? createdLead?.ownerId;
  expect(leadOwnerId).toBeTruthy();
  const expectedScore = 20 + 20 + 15 + 10 + 10 + 10;
  expect(lead.score).toBe(expectedScore);

  await page.goto('/app/leads');
  const row = page.locator('tr').filter({ hasText: companyName }).first();
  await row.locator('button[title="Edit"]').click();
  await page.waitForURL('**/app/leads/**');
  await selectByLabel(page, 'p-select[name="status"]', 'Qualified');
  const [updateResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/leads') && response.request().method() === 'PUT'),
    page.locator('button:has-text("Update lead")').click()
  ]);
  expect(updateResponse.ok()).toBeTruthy();
  await page.locator('button:has-text("Convert lead")').first().click();
  await page.waitForURL('**/app/leads/**/convert');
  const [convertResponse] = await Promise.all([
    page.waitForResponse(
      (response) => response.url().includes('/convert') && response.request().method() === 'POST'
    ),
    page.locator('form.convert-form button:has-text("Convert lead")').click()
  ]);
  expect(convertResponse.ok()).toBeTruthy();
  const conversion = await convertResponse.json();

  const contactResponse = await request.get(`${API_BASE_URL}/api/contacts/${conversion.contactId}`, {
    headers: {
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    }
  });
  expect(contactResponse.ok()).toBeTruthy();
  const contact = await contactResponse.json();
  expect(contact.ownerId).toBe(leadOwnerId);

  const customerResponse = await request.get(`${API_BASE_URL}/api/customers/${conversion.accountId}`, {
    headers: {
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    }
  });
  expect(customerResponse.ok()).toBeTruthy();
  const customer = await customerResponse.json();
  expect(customer.owner).toBe(lead.owner);

  const opportunityResponse = await request.get(`${API_BASE_URL}/api/opportunities/${conversion.opportunityId}`, {
    headers: {
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    }
  });
  expect(opportunityResponse.ok()).toBeTruthy();
  const opportunity = await opportunityResponse.json();
  expect(opportunity.owner).toBe(lead.owner);
});
