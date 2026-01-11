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

  return payload.accessToken as string;
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

async function apiGet(request, token: string, url: string) {
  return request.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
}

async function apiSearch(request, token: string, url: string, name: string) {
  const response = await apiGet(request, token, url);
  if (!response.ok()) {
    console.log('api search failed:', response.status(), await response.text());
    return { items: [] };
  }
  const payload = await response.json();
  const items = Array.isArray(payload?.items) ? payload.items : [];
  return { items };
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

async function selectByLabel(page, selector, optionText) {
  await openSelect(page, selector);
  const options = page.locator(
    '.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]'
  );
  const option = options.filter({ hasText: optionText }).first();
  await option.waitFor({ state: 'visible' });
  await option.click({ force: true });
}

async function searchWith(page, selector, term) {
  const input = page.locator(selector);
  await input.waitFor({ state: 'visible' });
  await input.fill(term);
  await page.waitForTimeout(300);
}

test('core create flows', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const suffix = Date.now();
  const customerName = `E2E Account ${suffix}`;
  const contactName = `E2E Contact ${suffix}`;
  const opportunityName = `E2E Opportunity ${suffix}`;
  const activitySubject = `E2E Activity ${suffix}`;

  await page.goto('/app/customers/new');
  await page.waitForURL('**/app/customers/new');
  await page.locator('input[name="name"]').fill(customerName);
  await page.locator('input[name="phone"]').fill('+1 555 0100');
  const [customerResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/customers') && response.request().method() === 'POST'),
    page.locator('button:has-text("Create Customer")').click()
  ]);
  if (!customerResponse.ok()) {
    console.log('customer create failed:', customerResponse.status(), await customerResponse.text());
  }
  expect(customerResponse.ok()).toBeTruthy();
  await page.goto('/app/customers');
  await searchWith(page, '.search-input', customerName);
  await expect(page.locator('.data-table')).toContainText(customerName);

  await page.goto('/app/contacts/new');
  await page.waitForURL('**/app/contacts/new');
  await page.locator('input[name="firstName"]').fill('E2E');
  await page.locator('input[name="lastName"]').fill(`Contact ${suffix}`);
  await page.locator('input[name="email"]').fill(`contact.${suffix}@example.com`);
  const [contactResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/contacts') && response.request().method() === 'POST'),
    page.locator('button:has-text("Create contact")').click()
  ]);
  if (!contactResponse.ok()) {
    console.log('contact create failed:', contactResponse.status(), await contactResponse.text());
  }
  expect(contactResponse.ok()).toBeTruthy();
  await page.goto('/app/contacts');
  await searchWith(page, '.search-input', contactName);
  await expect(page.locator('.contacts-table')).toContainText(contactName);

  await page.goto('/app/opportunities/new');
  await page.waitForURL('**/app/opportunities/new');
  await page.locator('input[name="name"]').fill(opportunityName);
  const [oppResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/opportunities') && response.request().method() === 'POST'),
    page.locator('button:has-text("Save opportunity")').click()
  ]);
  if (!oppResponse.ok()) {
    console.log('opportunity create failed:', oppResponse.status(), await oppResponse.text());
  }
  expect(oppResponse.ok()).toBeTruthy();
  await page.goto('/app/opportunities');
  const tableToggle = page.locator('button.view-toggle__btn', { has: page.locator('.pi-table') }).first();
  if (await tableToggle.count()) {
    await tableToggle.click();
  }
  const oppSearch = await apiSearch(
    request,
    token,
    `${API_BASE_URL}/api/opportunities?search=${encodeURIComponent(opportunityName)}&page=1&pageSize=10`,
    opportunityName
  );
  expect(oppSearch.items.some((item: { name?: string }) => item.name === opportunityName)).toBeTruthy();

  await page.goto('/app/activities/new');
  await page.waitForURL('**/app/activities/new');
  await page.locator('input[name="subject"]').fill(activitySubject);
  const [activityResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/activities') && response.request().method() === 'POST'),
    page.locator('button:has-text("Create activity")').click()
  ]);
  if (!activityResponse.ok()) {
    console.log('activity create failed:', activityResponse.status(), await activityResponse.text());
  }
  expect(activityResponse.ok()).toBeTruthy();
  await page.goto('/app/activities');
  await searchWith(page, '.search-box input', activitySubject);
  await expect(page.locator('.data-table')).toContainText(activitySubject);
});

test('quick add modal creates lead, contact, and activity', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const suffix = Date.now();
  const leadName = `QA Lead ${suffix}`;
  const contactName = `QA Contact ${suffix}`;
  const contactEmail = `qa.contact.${suffix}@example.com`;
  const activitySubject = `QA Activity ${suffix}`;

  await page.goto('/app/dashboard');
  await page.waitForURL('**/app/dashboard');

  await page.locator('.topbar__command-palette').click();
  await page.locator('.command-palette-backdrop').waitFor({ state: 'visible' });
  await page.locator('.command-palette__item', { hasText: 'Create New Lead' }).click();
  const quickAddDialog = page.locator('.quick-add-dialog');
  const quickAdd = page.locator('.quick-add');
  await quickAdd.waitFor({ state: 'visible' });
  await quickAdd.locator('.quick-add__grid input[placeholder="Lead name"]').fill(leadName);
  await quickAddDialog.locator('button:has-text("Create")').click();
  await quickAddDialog.waitFor({ state: 'hidden' });
  const leadSearch = await apiSearch(
    request,
    token,
    `${API_BASE_URL}/api/leads?search=${encodeURIComponent(leadName)}&page=1&pageSize=10`,
    leadName
  );
  expect(leadSearch.items.some((item: { name?: string }) => item.name?.includes(leadName))).toBeTruthy();

  await page.locator('.topbar__command-palette').click();
  await page.locator('.command-palette-backdrop').waitFor({ state: 'visible' });
  await page.locator('.command-palette__item', { hasText: 'Create New Contact' }).click();
  await quickAdd.waitFor({ state: 'visible' });
  await quickAdd.locator('.quick-add__grid input[placeholder="Contact name"]').fill(contactName);
  await quickAdd.locator('.quick-add__grid input[placeholder="name@company.com"]').fill(contactEmail);
  await quickAddDialog.locator('button:has-text("Create")').click();
  await quickAddDialog.waitFor({ state: 'hidden' });
  const contactSearch = await apiSearch(
    request,
    token,
    `${API_BASE_URL}/api/contacts?search=${encodeURIComponent(contactName)}&page=1&pageSize=10`,
    contactName
  );
  expect(contactSearch.items.some((item: { name?: string }) => item.name?.includes(contactName))).toBeTruthy();

  await page.locator('.topbar__command-palette').click();
  await page.locator('.command-palette-backdrop').waitFor({ state: 'visible' });
  await page.locator('.command-palette__item', { hasText: 'Create New Activity' }).click();
  await quickAdd.waitFor({ state: 'visible' });
  await quickAdd.locator('.quick-add__grid input[placeholder="Follow up call"]').fill(activitySubject);
  await quickAddDialog.locator('button:has-text("Create")').click();
  await quickAddDialog.waitFor({ state: 'hidden' });
  const activitySearch = await apiSearch(
    request,
    token,
    `${API_BASE_URL}/api/activities?search=${encodeURIComponent(activitySubject)}&page=1&pageSize=10`,
    activitySubject
  );
  expect(activitySearch.items.some((item: { subject?: string }) => item.subject?.includes(activitySubject))).toBeTruthy();
});
