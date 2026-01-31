import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function parseJsonSafely(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function postLogin(request, headers) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      ...(headers ?? {})
    },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    timeout: 15000
  });
  const payload = await parseJsonSafely(response);
  return { response, payload };
}

async function authenticate(page, request) {
  let payload = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const result = await postLogin(request);
    payload = result.payload;
    if (payload?.accessToken) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 750));
  }

  if (!payload?.accessToken) {
    const result = await postLogin(request, { 'X-Tenant-Key': 'default' });
    payload = result.payload;
  }

  if (!payload?.accessToken) {
    throw new Error('Unable to authenticate against the API during the Playwright test.');
  }

  await page.addInitScript((token, tenantKey) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', tenantKey as string);
  }, payload.accessToken, payload.tenantKey ?? 'default');

  await request.put(`${API_BASE_URL}/api/dashboard/layout`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.accessToken}`
    },
    data: {
      cardOrder: [
        'pipeline',
        'accounts',
        'manager-health',
        'activity-mix',
        'conversion',
        'top-performers',
        'my-tasks',
        'timeline',
        'health'
      ],
      sizes: {},
      dimensions: {},
      hiddenCards: []
    }
  });
}

test('priority stream replaces new leads and at-risk cards', async ({ page, request }) => {
  await authenticate(page, request);

  await page.goto('/app/dashboard', { waitUntil: 'networkidle' });

  await expect(page.getByRole('heading', { name: /My Tasks/i })).toBeVisible();
  await expect(page.locator('.dashboard-card .card-title', { hasText: 'Newly Assigned Leads' })).toHaveCount(0);
  await expect(page.locator('.dashboard-card .card-title', { hasText: 'At-Risk Deals' })).toHaveCount(0);
});

test('priority stream is available in customize layout menu', async ({ page, request }) => {
  await authenticate(page, request);

  await page.goto('/app/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Customize layout/i }).click();

  const dialog = page.getByRole('dialog', { name: /Customize Command Center/i });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('.layout-chart-list .layout-chart-item span', { hasText: 'My Task' })).toHaveCount(1);
});
