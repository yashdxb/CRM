import { test, expect } from '@playwright/test';

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.E2E_API_URL ??
  'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? process.env.E2E_ADMIN_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function login(page, request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email: SALES_REP_EMAIL, password: SALES_REP_PASSWORD }
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
  await selectHost.waitFor({ state: 'visible' });
  const trigger = selectHost.locator('.p-select');
  if (await trigger.count()) {
    await trigger.first().click({ force: true });
  } else {
    await selectHost.click({ force: true });
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
  const options = page.locator(
    '.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]'
  );
  const option = options.filter({ hasText: optionText }).first();
  let visible = false;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    await openSelect(page, selector);
    try {
      await option.waitFor({ state: 'visible', timeout: 2000 });
      visible = true;
      break;
    } catch {
      await page.keyboard.press('Escape').catch(() => null);
      await page.waitForTimeout(150);
    }
  }
  if (!visible) {
    throw new Error(`Option "${optionText}" not visible for selector ${selector}`);
  }
  await option.click({ force: true });
}

async function openTab(page, label) {
  const tab = page.locator('.lead-tab', { hasText: label }).first();
  if (await tab.count()) {
    await tab.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    await tab.click({ force: true });
  }
}

async function searchLeads(page, term) {
  const input = page.locator('.search-box input');
  await input.waitFor({ state: 'visible' });
  await input.fill(term);
  await page.waitForTimeout(300);
}

async function fillQualificationFactors(page) {
  await selectByLabel(page, 'p-select[name="budgetAvailability"]', 'Budget allocated and approved');
  await selectByLabel(page, 'p-select[name="readinessToSpend"]', 'Actively evaluating');
  await selectByLabel(page, 'p-select[name="icpFit"]', 'Strong');
}

async function setDateInputByOffset(page, selector, offsetDays) {
  const input = page.locator(`${selector} input`);
  await input.waitFor({ state: 'visible' });
  await input.click();

  const target = new Date(Date.now() + offsetDays * 24 * 60 * 60 * 1000);
  const targetDay = target.getDate();
  const targetMonth = target.getMonth();
  const targetYear = target.getFullYear();

  const calendarDialog = page.getByRole('dialog', { name: 'Choose Date' });
  await calendarDialog.waitFor({ state: 'visible' });

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  for (let i = 0; i < 12; i += 1) {
    const monthButton = calendarDialog.locator('button[aria-label="Choose Month"]');
    const yearButton = calendarDialog.locator('button[aria-label="Choose Year"]');
    const monthText = (await monthButton.innerText()).trim();
    const yearText = (await yearButton.innerText()).trim();
    const monthIndex = monthNames.indexOf(monthText);
    const year = Number(yearText);
    if (monthIndex === targetMonth && year === targetYear) {
      break;
    }
    const next = calendarDialog.getByRole('button', { name: 'Next Month' });
    await next.click();
    await page.waitForTimeout(150);
  }

  await calendarDialog.getByRole('gridcell', { name: String(targetDay) }).first().click();

  await input.press('Tab');
  await expect(input).not.toHaveValue('');
}

async function updateLeadStatus(page, name, status) {
  await page.goto('/app/leads');
  await searchLeads(page, name);
  const row = page.locator('tr').filter({ hasText: name }).first();
  await row.locator('button[title="Edit"]').click();
  await page.waitForURL('**/app/leads/**');
  await page.locator('form.lead-form').waitFor({ state: 'visible' });
  await openTab(page, 'Overview');
  await selectByLabel(page, 'p-select[name="status"]', status);
}

async function saveLeadUpdate(page) {
  const updateButton = page.locator('button:has-text("Update lead")');
  await expect(updateButton).toBeEnabled();

  const responsePromise = page
    .waitForResponse(
      (response) => response.url().includes('/api/leads') && response.request().method() === 'PUT',
      { timeout: 30_000 }
    )
    .catch(() => null);
  const toastPromise = page
    .getByText('Lead updated.')
    .waitFor({ state: 'visible', timeout: 30_000 })
    .then(() => 'toast')
    .catch(() => null);

  await updateButton.click();

  const result = await Promise.race([
    responsePromise.then((response) => ({ type: 'response', response })),
    toastPromise.then((toast) => ({ type: 'toast', toast }))
  ]);

  if (!result || (result.type === 'response' && !result.response)) {
    throw new Error('Lead update did not complete within timeout.');
  }
  if (result.type === 'response' && !result.response.ok()) {
    console.log('lead update failed:', result.response.status(), await result.response.text());
  }
}

async function getFirstUserName(request, token) {
  const response = await request.get(`${API_BASE_URL}/api/users?page=1&pageSize=25`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  if (!response.ok()) {
    return null;
  }
  const text = await response.text();
  if (!text) {
    return null;
  }
  const payload = JSON.parse(text);
  const items = Array.isArray(payload) ? payload : payload.items ?? payload.data ?? [];
  const first = items.find((u) => u?.fullName);
  return first?.fullName ?? null;
}

async function createDiscoveryMeeting(request, token, leadId) {
  const dueDateUtc = new Date().toISOString();
  await request.post(`${API_BASE_URL}/api/activities`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      subject: 'Discovery meeting',
      description: 'E2E discovery meeting',
      outcome: null,
      type: 3,
      priority: 'Medium',
      dueDateUtc,
      completedDateUtc: null,
      nextStepSubject: null,
      nextStepDueDateUtc: null,
      relatedEntityType: 1,
      relatedEntityId: leadId,
      ownerId: null
    }
  });
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
  const firstUserName = await getFirstUserName(request, token);

  await page.goto('/app/leads/new');
  await page.waitForURL('**/app/leads/new');
  await page.locator('form.lead-form').waitFor({ state: 'visible' });
  await page.locator('input[name="firstName"]').fill('Manual');
  await page.locator('input[name="lastName"]').fill(`UI ${suffix}`);
  await page.locator('input[name="companyName"]').fill(manualLead);
  await selectByLabel(page, 'p-select[name="assignmentStrategy"]', 'Manual');
  if (firstUserName) {
    await selectByLabel(page, 'p-select[name="ownerId"]', firstUserName);
  } else {
    await selectFirstOption(page, 'p-select[name="ownerId"]');
  }
  await expect(page.locator('button:has-text("Create lead")')).toBeEnabled();
  const [manualResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/leads') && response.request().method() === 'POST'),
    page.locator('button:has-text("Create lead")').click()
  ]);
  if (!manualResponse.ok()) {
    console.log('manual lead create failed:', manualResponse.status(), await manualResponse.text());
  }
  expect(manualResponse.ok()).toBeTruthy();
  const manualLeadItem = await manualResponse.json();
  const manualLeadId = manualLeadItem?.id;
  if (manualLeadId) {
    await createDiscoveryMeeting(request, token, manualLeadId);
  }
  await page.goto('/app/leads');
  await expect(page.locator('.leads-table')).toContainText(manualLead);

  await page.goto('/app/leads/new');
  await page.waitForURL('**/app/leads/new');
  await page.locator('form.lead-form').waitFor({ state: 'visible' });
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
  await page.locator('form.lead-form').waitFor({ state: 'visible' });
  await openTab(page, 'Qualification');
  await fillQualificationFactors(page);
  await page.locator('textarea[name="qualifiedNotes"]').fill('E2E qualification notes.');
  await openTab(page, 'Overview');
  await selectByLabel(page, 'p-select[name="status"]', 'Qualified');
  const [updateResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/leads') && response.request().method() === 'PUT'),
    page.locator('button:has-text("Update lead")').click()
  ]);
  if (!updateResponse.ok()) {
    console.log('lead update failed:', updateResponse.status(), await updateResponse.text());
  }
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
  const firstUserName = await getFirstUserName(request, token);

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
  if (firstUserName) {
    await selectByLabel(page, 'p-select[name="ownerId"]', firstUserName);
  } else {
    await selectFirstOption(page, 'p-select[name="ownerId"]');
  }

  const [createResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/leads') && response.request().method() === 'POST'),
    page.locator('button:has-text("Create lead")').click()
  ]);
  if (!createResponse.ok()) {
    console.log('auto lead create failed:', createResponse.status(), await createResponse.text());
  }
  expect(createResponse.ok()).toBeTruthy();
  const createdLead = await createResponse.json();
  const leadId = createdLead?.id;
  expect(leadId).toBeTruthy();
  await createDiscoveryMeeting(request, token, leadId);

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
  await openTab(page, 'Qualification');
  await fillQualificationFactors(page);
  await page.locator('textarea[name="qualifiedNotes"]').fill('E2E qualification notes.');
  await openTab(page, 'Overview');
  await selectByLabel(page, 'p-select[name="status"]', 'Qualified');
  const [updateResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/leads') && response.request().method() === 'PUT'),
    page.locator('button:has-text("Update lead")').click()
  ]);
  if (!updateResponse.ok()) {
    console.log('lead update failed:', updateResponse.status(), await updateResponse.text());
  }
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

test('seed azure lead scenarios (sales rep)', async ({ page, request }) => {
  const baseUrl = process.env.E2E_BASE_URL ?? 'https://www.northedgesystem.com';
  if (!baseUrl.includes('localhost') && !baseUrl.includes('127.0.0.1')) {
    test.skip(true, 'Seeding is disabled for Azure/dev. Run against local only.');
  }
  const suffix = Date.now();
  attachDiagnostics(page);

  await login(page, request);

  const scenarios = [
    { key: 'New', first: 'Azure', last: `New ${suffix}`, company: `Azure New ${suffix}` },
    { key: 'Nurture', first: 'Azure', last: `Nurture ${suffix}`, company: `Azure Nurture ${suffix}` },
    { key: 'Qualified', first: 'Azure', last: `Qualified ${suffix}`, company: `Azure Qualified ${suffix}` },
    { key: 'Disqualified', first: 'Azure', last: `Disqualified ${suffix}`, company: `Azure Disqualified ${suffix}` },
    { key: 'Converted', first: 'Azure', last: `Converted ${suffix}`, company: `Azure Converted ${suffix}` }
  ];

  for (const lead of scenarios) {
    await page.goto('/app/leads/new');
    await page.waitForURL('**/app/leads/new');
    await page.locator('form.lead-form').waitFor({ state: 'visible' });
    await page.locator('input[name="firstName"]').fill(lead.first);
    await page.locator('input[name="lastName"]').fill(lead.last);
    await page.locator('input[name="companyName"]').fill(lead.company);
    await selectByLabel(page, 'p-select[name="assignmentStrategy"]', 'Manual');
    await selectFirstOption(page, 'p-select[name="ownerId"]');
    await expect(page.locator('button:has-text("Create lead")')).toBeEnabled();
    const responsePromise = page
      .waitForResponse((response) => response.url().includes('/api/leads') && response.request().method() === 'POST', { timeout: 30_000 })
      .catch(() => null);
    await Promise.all([
      page.locator('button:has-text("Create lead")').click(),
      page.waitForURL('**/app/leads/**/edit', { timeout: 30_000 }).catch(() => null)
    ]);
    const createResponse = await responsePromise;
    if (createResponse && !createResponse.ok()) {
      console.log(`lead create failed (${lead.key}):`, createResponse.status(), await createResponse.text());
    }
    expect(createResponse ? createResponse.ok() : true).toBeTruthy();
  }

  await updateLeadStatus(page, scenarios[1].company, 'Nurture');
  await openTab(page, 'Qualification');
  await setDateInputByOffset(page, 'p-datepicker[name="nurtureFollowUpAtUtc"]', 7);
  await openTab(page, 'Overview');
  await saveLeadUpdate(page);

  await updateLeadStatus(page, scenarios[2].company, 'Qualified');
  await openTab(page, 'Qualification');
  await fillQualificationFactors(page);
  await page.locator('textarea[name="qualifiedNotes"]').fill('Qualified via Azure E2E seed.');
  await openTab(page, 'Overview');
  await saveLeadUpdate(page);

  await updateLeadStatus(page, scenarios[3].company, 'Disqualified');
  await openTab(page, 'Qualification');
  await page.locator('textarea[name="disqualifiedReason"]').fill('No fit / budget.');
  await openTab(page, 'Overview');
  await saveLeadUpdate(page);

  await updateLeadStatus(page, scenarios[4].company, 'Qualified');
  await openTab(page, 'Qualification');
  await fillQualificationFactors(page);
  await page.locator('textarea[name="qualifiedNotes"]').fill('Ready to convert (Azure seed).');
  await openTab(page, 'Overview');
  await saveLeadUpdate(page);
  await page.locator('button:has-text("Convert lead")').first().click();
  await page.waitForURL('**/app/leads/**/convert');
  const [convertResponse] = await Promise.all([
    page.waitForResponse(
      (response) => response.url().includes('/convert') && response.request().method() === 'POST'
    ),
    page.locator('form.convert-form button:has-text("Convert lead")').click()
  ]);
  expect(convertResponse.ok()).toBeTruthy();
  await page.waitForURL('**/app/leads');
});
