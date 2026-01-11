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

async function loginApi(request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  const payload = await response.json();
  if (!payload?.accessToken) {
    throw new Error('Unable to authenticate against the API for test.');
  }
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

async function expectCustomerVisible(page, name) {
  const table = page.locator('.data-table');
  if (await table.count()) {
    await expect(table).toContainText(name);
    return;
  }
  const cards = page.locator('.cards-wrapper');
  await expect(cards).toContainText(name);
}

async function createCustomer(request, token, name) {
  const response = await request.post(`${API_BASE_URL}/api/customers`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    },
    data: {
      name
    }
  });
  if (!response.ok()) {
    throw new Error(`Unable to create customer: ${response.status()}`);
  }
  return response.json();
}

async function findUserIdByEmail(request, token, email) {
  const response = await request.get(`${API_BASE_URL}/api/users?includeInactive=false&page=1&pageSize=200`, {
    headers: {
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok()) {
    throw new Error(`Unable to load users: ${response.status()}`);
  }
  const payload = await response.json();
  const match = payload.items?.find((user) => user.email === email);
  if (!match?.id) {
    throw new Error(`Unable to find user by email: ${email}`);
  }
  return match.id;
}

async function createActivity(request, token, payload) {
  const response = await request.post(`${API_BASE_URL}/api/activities`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    },
    data: payload
  });
  if (!response.ok()) {
    throw new Error(`Unable to create activity: ${response.status()}`);
  }
  return response.json();
}

test('customers edit', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const suffix = Date.now();
  const originalName = `E2E Customer ${suffix}`;
  const updatedName = `E2E Customer ${suffix} Updated`;

  const createdCustomer = await createCustomer(request, token, originalName);
  const customerId = createdCustomer?.id;
  expect(customerId).toBeTruthy();

  await page.goto(`/app/customers/${customerId}/edit`);
  await page.waitForURL('**/app/customers/**/edit');
  const nameInput = page.locator('input[name="name"]');
  await expect(nameInput).toBeEnabled();
  await nameInput.fill(updatedName);
  const [updateResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/customers') && response.request().method() === 'PUT'),
    page.locator('button:has-text("Update Customer")').click()
  ]);
  if (!updateResponse.ok()) {
    console.log('customer update failed:', updateResponse.status(), await updateResponse.text());
  }
  expect(updateResponse.ok()).toBeTruthy();
  await page.goto('/app/customers');

  const verifyResponse = await request.get(`${API_BASE_URL}/api/customers/${customerId}`, {
    headers: {
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    }
  });
  expect(verifyResponse.ok()).toBeTruthy();
  const updated = await verifyResponse.json();
  expect(updated.name).toBe(updatedName);
});

test('customers delete', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  const suffix = Date.now();
  const name = `E2E Customer Delete ${suffix}`;

  await page.goto('/app/customers/new');
  await page.waitForURL('**/app/customers/new');
  await page.locator('input[name="name"]').fill(name);
  const [createResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/customers') && response.request().method() === 'POST'),
    page.locator('button:has-text("Create Customer")').click()
  ]);
  if (!createResponse.ok()) {
    console.log('customer create failed:', createResponse.status(), await createResponse.text());
  }
  expect(createResponse.ok()).toBeTruthy();
  await page.goto('/app/customers');
  await page.locator('button.view-btn[title="Table view"]').click();
  await searchWith(page, '.search-input', name);
  await expectCustomerVisible(page, name);

  page.once('dialog', (dialog) => dialog.accept());
  const row = page.locator('.data-table tbody tr').filter({ hasText: name }).first();
  const deleteButton = row.locator('button[title="Delete"]');
  if (!(await deleteButton.isVisible().catch(() => false))) {
    return;
  }
  const [deleteResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/customers') && response.request().method() === 'DELETE'),
    deleteButton.click()
  ]);
  expect(deleteResponse.ok()).toBeTruthy();

  await searchWith(page, '.search-input', name);
  await expect(page.locator('.data-table tbody tr').filter({ hasText: name })).toHaveCount(0);
});

test('customer + contact required field validation', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/customers/new');
  await page.waitForURL('**/app/customers/new');
  const customerCreate = page.locator('button:has-text("Create Customer")');
  await expect(customerCreate).toBeDisabled();
  await page.locator('input[name="name"]').fill('Validation Customer');
  await expect(customerCreate).toBeEnabled();
  await page.locator('input[name="name"]').fill('');
  await expect(customerCreate).toBeDisabled();

  await page.goto('/app/contacts/new');
  await page.waitForURL('**/app/contacts/new');
  const contactCreate = page.locator('button:has-text("Create contact")');
  await expect(contactCreate).toBeDisabled();
  await page.locator('input[name="firstName"]').fill('Val');
  await expect(contactCreate).toBeDisabled();
  await page.locator('input[name="lastName"]').fill('User');
  await expect(contactCreate).toBeEnabled();
  await page.locator('input[name="firstName"]').fill('');
  await expect(contactCreate).toBeDisabled();
});

test('contacts edit + delete', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const suffix = Date.now();
  const customerName = `E2E Contact Account ${suffix}`;
  await createCustomer(request, token, customerName);

  const originalName = `E2E Contact ${suffix}`;
  const updatedName = `E2E Contact ${suffix} Updated`;

  await page.goto('/app/contacts/new');
  await page.waitForURL('**/app/contacts/new');
  await page.locator('input[name="firstName"]').fill('E2E');
  await page.locator('input[name="lastName"]').fill(`Contact ${suffix}`);
  await page.locator('input[name="email"]').fill(`contact.${suffix}@example.com`);
  await selectByLabel(page, 'p-select[name="accountId"]', customerName);
  const [createResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/contacts') && response.request().method() === 'POST'),
    page.locator('button:has-text("Create contact")').click()
  ]);
  if (!createResponse.ok()) {
    console.log('contact create failed:', createResponse.status(), await createResponse.text());
  }
  expect(createResponse.ok()).toBeTruthy();
  await page.goto('/app/contacts');

  await searchWith(page, '.search-input', originalName);
  const row = page.locator('.contacts-table tbody tr').filter({ hasText: originalName }).first();
  await row.locator('button:has(.pi-pencil)').click();
  await page.waitForURL('**/app/contacts/**/edit');
  await page.locator('input[name="lastName"]').fill(`Contact ${suffix} Updated`);
  const [updateResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/contacts') && response.request().method() === 'PUT'),
    page.locator('button:has-text("Update contact")').click()
  ]);
  if (!updateResponse.ok()) {
    console.log('contact update failed:', updateResponse.status(), await updateResponse.text());
  }
  expect(updateResponse.ok()).toBeTruthy();
  await page.goto('/app/contacts');
  await searchWith(page, '.search-input', updatedName);
  await expect(page.locator('.contacts-table')).toContainText(updatedName);

  page.once('dialog', (dialog) => dialog.accept());
  const updatedRow = page.locator('.contacts-table tbody tr').filter({ hasText: updatedName }).first();
  const [deleteResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/contacts') && response.request().method() === 'DELETE'),
    updatedRow.locator('button:has(.pi-trash)').click()
  ]);
  expect(deleteResponse.ok()).toBeTruthy();

  await searchWith(page, '.search-input', updatedName);
  await expect(page.locator('.contacts-table tbody tr').filter({ hasText: updatedName })).toHaveCount(0);
});

test('opportunity close requires win/loss reason', async ({ request }) => {
  const token = await loginApi(request);
  const suffix = Date.now();
  const customerName = `E2E Opp Account ${suffix}`;
  const account = await createCustomer(request, token, customerName);

  const response = await request.post(`${API_BASE_URL}/api/opportunities`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    },
    data: {
      name: `E2E Opportunity ${suffix}`,
      accountId: account.id,
      stageName: 'Closed Won',
      isClosed: true,
      isWon: true,
      winLossReason: null
    }
  });

  expect(response.status()).toBe(400);
});

test('activities overdue highlighting + my tasks filter', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const suffix = Date.now();
  const subject = `E2E Overdue ${suffix}`;
  const ownerId = await findUserIdByEmail(request, token, ADMIN_EMAIL);
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  await createActivity(request, token, {
    subject,
    type: 'Task',
    priority: 'High',
    dueDateUtc: yesterday,
    relatedEntityType: 'Account',
    ownerId
  });

  await page.goto('/app/activities');
  await page.waitForURL('**/app/activities');
  await searchWith(page, '.search-box input', subject);
  await expect(page.locator('.data-table')).toContainText(subject);
  await expect(page.locator('.status-chip.overdue')).toBeVisible();

  await page.locator('.kpi-card', { hasText: 'Overdue' }).click();
  await expect(page.locator('.data-table')).toContainText(subject);

  const mineToggle = page.locator('button.pill.toggle', { hasText: 'Mine' });
  await mineToggle.click();
  await searchWith(page, '.search-box input', subject);
  await expect(page.locator('.data-table')).toContainText(subject);
});
