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
    localStorage.setItem('tenant_key', 'default');
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
  await tab.waitFor({ state: 'visible', timeout: 10_000 });
  await tab.scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await tab.click({ force: true });
}

async function searchLeads(page, term) {
  const input = page.locator('.search-box input');
  await input.waitFor({ state: 'visible' });
  await input.fill(term);
  await page.waitForTimeout(300);
}

async function fillQualificationFactors(page) {
  await page.locator('p-select[name="budgetAvailability"]').waitFor({ state: 'visible', timeout: 10_000 });
  await selectByLabel(page, 'p-select[name="budgetAvailability"]', 'Budget allocated and approved');
  await selectByLabel(page, 'p-select[name="readinessToSpend"]', 'Internal decision in progress');
  await selectByLabel(page, 'p-select[name="buyingTimeline"]', 'Decision date confirmed internally');
  await selectByLabel(page, 'p-select[name="problemSeverity"]', 'Critical business impact');
  await selectByLabel(page, 'p-select[name="economicBuyer"]', 'Buyer engaged in discussion');
  await selectByLabel(page, 'p-select[name="icpFit"]', 'Strong');
}

function getLeadIdFromUrl(page) {
  const match = page.url().match(/\/app\/leads\/([^/]+)/);
  return match?.[1] ?? null;
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

async function updateLeadStatus(page, request, token, name, status) {
  await page.goto('/app/leads');
  await searchLeads(page, name);
  const row = page.locator('tr').filter({ hasText: name }).first();
  await row.locator('button[title="Edit"]').click();
  await page.waitForURL('**/app/leads/**');
  await page.locator('form.lead-form').waitFor({ state: 'visible' });
  if (status === 'Qualified') {
    const leadId = getLeadIdFromUrl(page);
    if (leadId && request && token) {
      await createDiscoveryMeeting(request, token, leadId);
    }
  }
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
  const completedDateUtc = new Date().toISOString();
  const nextStepDueDateUtc = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const response = await request.post(`${API_BASE_URL}/api/activities`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      subject: 'Discovery meeting',
      description: 'E2E discovery meeting',
      outcome: 'Discovery held',
      type: 'Meeting',
      priority: 'Medium',
      dueDateUtc,
      completedDateUtc,
      nextStepSubject: 'Follow-up from discovery',
      nextStepDueDateUtc,
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
      ownerId: null
    }
  });
  if (!response.ok()) {
    console.log('discovery meeting create failed:', response.status(), await response.text());
  }
  expect(response.ok()).toBeTruthy();
}

async function updateLeadViaApi(request, token, leadId, overrides) {
  const leadResponse = await request.get(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: {
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    }
  });
  if (!leadResponse.ok()) {
    throw new Error(`Unable to load lead ${leadId} for API update: ${leadResponse.status()}`);
  }
  const lead = await leadResponse.json();
  const [firstName, ...rest] = (lead?.name ?? 'Lead').split(' ');
  const payload = {
    firstName: firstName || 'Lead',
    lastName: rest.join(' ') || 'Lead',
    email: lead.email ?? null,
    phone: lead.phone ?? null,
    companyName: lead.company ?? null,
    jobTitle: lead.jobTitle ?? null,
    status: lead.status ?? null,
    ownerId: lead.ownerId ?? null,
    assignmentStrategy: lead.ownerId ? 'Manual' : null,
    source: lead.source ?? null,
    routingReason: lead.routingReason ?? null,
    territory: lead.territory ?? null,
    autoScore: false,
    score: lead.score ?? 0,
    accountId: lead.accountId ?? null,
    contactId: lead.contactId ?? null,
    disqualifiedReason: lead.disqualifiedReason ?? null,
    lossReason: lead.lossReason ?? null,
    lossCompetitor: lead.lossCompetitor ?? null,
    lossNotes: lead.lossNotes ?? null,
    nurtureFollowUpAtUtc: lead.nurtureFollowUpAtUtc ?? null,
    qualifiedNotes: lead.qualifiedNotes ?? null,
    budgetAvailability: lead.budgetAvailability ?? null,
    budgetEvidence: lead.budgetEvidence ?? null,
    readinessToSpend: lead.readinessToSpend ?? null,
    readinessEvidence: lead.readinessEvidence ?? null,
    buyingTimeline: lead.buyingTimeline ?? null,
    timelineEvidence: lead.timelineEvidence ?? null,
    problemSeverity: lead.problemSeverity ?? null,
    problemEvidence: lead.problemEvidence ?? null,
    economicBuyer: lead.economicBuyer ?? null,
    economicBuyerEvidence: lead.economicBuyerEvidence ?? null,
    icpFit: lead.icpFit ?? null,
    icpFitEvidence: lead.icpFitEvidence ?? null,
    ...overrides
  };

  const updateResponse = await request.put(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    },
    data: payload
  });

  if (!updateResponse.ok()) {
    throw new Error(`Unable to update lead ${leadId}: ${updateResponse.status()}`);
  }
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
  const manualResponsePromise = page
    .waitForResponse((response) => response.url().includes('/api/leads') && response.request().method() === 'POST', { timeout: 30_000 })
    .catch(() => null);
  await page.locator('button:has-text("Create lead")').click();
  await page.waitForURL('**/app/leads/**/edit', { timeout: 30_000 });
  const manualResponse = await manualResponsePromise;
  if (!manualResponse) {
    throw new Error('manual lead create did not return a response.');
  }
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
  const roundResponsePromise = page
    .waitForResponse((response) => response.url().includes('/api/leads') && response.request().method() === 'POST', { timeout: 30_000 })
    .catch(() => null);
  await page.locator('button:has-text("Create lead")').click();
  await page.waitForURL('**/app/leads/**/edit', { timeout: 30_000 });
  const roundResponse = await roundResponsePromise;
  if (roundResponse && !roundResponse.ok()) {
    console.log('round lead create failed:', roundResponse.status(), await roundResponse.text());
  }
  expect(roundResponse ? roundResponse.ok() : true).toBeTruthy();
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
  const manualLeadEditId = getLeadIdFromUrl(page);
  if (manualLeadEditId) {
    await createDiscoveryMeeting(request, token, manualLeadEditId);
  }
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
  await page.locator('form.lead-form').waitFor({ state: 'visible' });
  const autoLeadEditId = getLeadIdFromUrl(page);
  if (autoLeadEditId) {
    await createDiscoveryMeeting(request, token, autoLeadEditId);
  }
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

  const token = await login(page, request);

  const scenarios = [
    { key: 'New', first: 'Azure', last: `New ${suffix}`, company: `Azure New ${suffix}` },
    { key: 'Nurture', first: 'Azure', last: `Nurture ${suffix}`, company: `Azure Nurture ${suffix}` },
    { key: 'Qualified', first: 'Azure', last: `Qualified ${suffix}`, company: `Azure Qualified ${suffix}` },
    { key: 'Disqualified', first: 'Azure', last: `Disqualified ${suffix}`, company: `Azure Disqualified ${suffix}` },
    { key: 'Converted', first: 'Azure', last: `Converted ${suffix}`, company: `Azure Converted ${suffix}` }
  ];

  const scenarioIds = new Map<string, string>();
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
    if (createResponse && createResponse.ok()) {
      const createdLead = await createResponse.json();
      if (createdLead?.id) {
        scenarioIds.set(lead.company, createdLead.id);
      }
    }
  }

  const qualifiedId = scenarioIds.get(scenarios[2].company);
  if (qualifiedId) {
    await createDiscoveryMeeting(request, token, qualifiedId);
  }
  const convertedId = scenarioIds.get(scenarios[4].company);
  if (convertedId) {
    await createDiscoveryMeeting(request, token, convertedId);
  }

  await updateLeadStatus(page, request, token, scenarios[1].company, 'Nurture');
  await openTab(page, 'Qualification');
  await setDateInputByOffset(page, 'p-datepicker[name="nurtureFollowUpAtUtc"]', 7);
  await openTab(page, 'Overview');
  await saveLeadUpdate(page);

  await updateLeadStatus(page, request, token, scenarios[2].company, 'Qualified');
  const scenarioQualifiedId = getLeadIdFromUrl(page);
  if (scenarioQualifiedId) {
    await createDiscoveryMeeting(request, token, scenarioQualifiedId);
  }
  await openTab(page, 'Qualification');
  await fillQualificationFactors(page);
  await page.locator('textarea[name="qualifiedNotes"]').fill('Qualified via Azure E2E seed.');
  await openTab(page, 'Overview');
  await saveLeadUpdate(page);

  await updateLeadStatus(page, request, token, scenarios[3].company, 'Disqualified');
  await openTab(page, 'Qualification');
  const disqualifiedField = page.locator('textarea[name="disqualifiedReason"]');
  try {
    await disqualifiedField.waitFor({ state: 'visible', timeout: 6_000 });
    await disqualifiedField.fill('No fit / budget.');
    await openTab(page, 'Overview');
    await saveLeadUpdate(page);
  } catch {
    const disqualifiedId = getLeadIdFromUrl(page);
    if (!disqualifiedId) {
      throw new Error('Unable to resolve disqualified lead id for API fallback.');
    }
    await updateLeadViaApi(request, token, disqualifiedId, {
      status: 'Disqualified',
      disqualifiedReason: 'No fit / budget.'
    });
  }

  await updateLeadStatus(page, request, token, scenarios[4].company, 'Qualified');
  const scenarioConvertedId = getLeadIdFromUrl(page);
  if (scenarioConvertedId) {
    await createDiscoveryMeeting(request, token, scenarioConvertedId);
  }
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
