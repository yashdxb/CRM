import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';
const TENANT_KEY = process.env.E2E_TENANT_KEY ?? 'default';

async function apiLogin(request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': TENANT_KEY },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  const payload = await response.json();
  if (!payload?.accessToken) {
    throw new Error('Unable to authenticate against the API for UI test.');
  }
  return payload.accessToken as string;
}

async function apiGetDefaultLayout(request, token: string, level?: number) {
  const url = level
    ? `${API_BASE_URL}/api/dashboard/layout/default?level=${encodeURIComponent(String(level))}`
    : `${API_BASE_URL}/api/dashboard/layout/default`;
  const response = await request.get(url, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT_KEY }
  });
  expect(response.ok()).toBeTruthy();
  return response.json() as Promise<{ cardOrder?: string[]; hiddenCards?: string[]; roleLevel?: number | null }>;
}

async function apiPutDefaultLayout(request, token: string, roleLevel: number, cardOrder: string[], hiddenCards: string[]) {
  const response = await request.put(`${API_BASE_URL}/api/dashboard/layout/default`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT_KEY, 'Content-Type': 'application/json' },
    data: {
      roleLevel,
      cardOrder,
      sizes: {},
      dimensions: {},
      hiddenCards
    }
  });
  expect(response.ok()).toBeTruthy();
}

async function apiPutUserLayout(request, token: string, cardOrder: string[], hiddenCards: string[]) {
  const response = await request.put(`${API_BASE_URL}/api/dashboard/layout`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT_KEY, 'Content-Type': 'application/json' },
    data: {
      cardOrder,
      sizes: {},
      dimensions: {},
      hiddenCards
    }
  });
  expect(response.ok()).toBeTruthy();
}

async function loginUi(page, token: string) {
  await page.addInitScript(({ t, tenantKey }) => {
    localStorage.setItem('auth_token', t);
    localStorage.setItem('tenant_key', tenantKey);
  }, { t: token, tenantKey: TENANT_KEY });
}

async function openSelect(page, hostSelector: string) {
  const host = page.locator(hostSelector);
  await host.waitFor({ state: 'visible' });
  const trigger = host.locator('.p-select');
  if (await trigger.count()) {
    await trigger.first().click();
  } else {
    await host.click();
  }
}

async function selectOptionByText(page, optionText: string) {
  const option = page
    .locator('.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay [role="option"], [role="option"]')
    .filter({ hasText: optionText })
    .first();
  await option.waitFor({ state: 'visible' });
  await option.click({ force: true });
}

test('Dashboard packs selection updates Dashboard Customize Layout selectable cards', async ({ page, request }) => {
  const token = await apiLogin(request);
  await loginUi(page, token);

  // Use the current user role level so we edit the same "default pack" the dashboard reads.
  const currentDefault = await apiGetDefaultLayout(request, token);
  const roleLevel = currentDefault.roleLevel && currentDefault.roleLevel > 0 ? currentDefault.roleLevel : 1;

  // Seed a known default layout that includes execution-guide.
  const fullOrder = [
    'pipeline',
    'truth-metrics',
    'risk-register',
    'risk-checklist',
    'execution-guide',
    'confidence-forecast',
    'forecast-scenarios',
    'my-forecast',
    'expansion-signals',
    'accounts',
    'manager-health',
    'activity-mix',
    'conversion',
    'top-performers',
    'my-tasks',
    'timeline',
    'health'
  ];
  await apiPutDefaultLayout(request, token, roleLevel, fullOrder, []); // no hidden

  // Verify dashboard Customize Layout shows Execution Guide as selectable.
  await page.goto('/app/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Customize layout/i }).click();
  const dialog = page.locator('.layout-dialog');
  await expect(dialog).toBeVisible();
  const commandCenterCards = dialog.locator('.layout-chart-section').filter({ hasText: 'Command Center cards' }).first();
  await expect(commandCenterCards.locator('.layout-chart-item', { hasText: 'Execution Guide' })).toHaveCount(1);
  await page.keyboard.press('Escape');

  // Now remove execution-guide via Dashboard Packs UI and save.
  await page.goto('/app/settings/dashboard-packs', { waitUntil: 'networkidle' });
  await openSelect(page, 'p-select[placeholder="Select H1/H2/H3"]');
  await selectOptionByText(page, `H${roleLevel}`);

  const execRow = page.locator('.kpi-table tbody tr').filter({ hasText: 'execution-guide' }).first();
  await execRow.waitFor({ state: 'visible' });
  const execCheckbox = execRow.locator('input[type="checkbox"]').first();
  await expect(execCheckbox).toBeChecked();
  await execCheckbox.setChecked(false, { force: true });
  await expect(execCheckbox).not.toBeChecked();

  const saveButton = page.getByRole('button', { name: /Save Role-Level Pack|Save default pack/i });
  const putDefaultPromise = page.waitForResponse((response) =>
    response.url().includes('/api/dashboard/layout/default') && response.request().method() === 'PUT'
  );
  await saveButton.click();
  const putDefaultResponse = await putDefaultPromise;
  expect(putDefaultResponse.ok()).toBeTruthy();

  // Confirm via API that the saved default no longer includes execution-guide.
  const updated = await apiGetDefaultLayout(request, token, roleLevel);
  const order = updated.cardOrder ?? [];
  expect(order).not.toContain('execution-guide');

  // Seed a user layout that still contains execution-guide (should be stripped by role pack allowlist).
  await apiPutUserLayout(request, token, ['pipeline', 'execution-guide', ...order], []);

  // Verify dashboard Customize Layout selectable cards no longer include Execution Guide.
  await page.goto('/app/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Customize layout/i }).click();
  await expect(dialog).toBeVisible();
  const commandCenterCardsAfter = dialog.locator('.layout-chart-section').filter({ hasText: 'Command Center cards' }).first();
  await expect(commandCenterCardsAfter.locator('.layout-chart-item', { hasText: 'Execution Guide' })).toHaveCount(0);

  // Also ensure the order list (drag/drop) doesn't contain it.
  const orderList = dialog.locator('.p-orderlist, [data-pc-name=\"orderlist\"], .p-orderlist-list').first();
  await expect(orderList.getByText('Execution Guide')).toHaveCount(0);
});
