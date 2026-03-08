import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

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

  await page.goto('/');
  await page.evaluate((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

test.describe('Reports Experience', () => {
  test('reports page renders the report library contract without legacy viewer errors', async ({ page, request }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await login(page, request);
    await page.goto('/app/reports');

    await expect(page.getByRole('heading', { name: 'Reports' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Report Library' })).toBeVisible();
    await expect(page.locator('.catalog-card')).toHaveCount(6);
    await expect(page.locator('text=Report Server is not configured for this environment')).toHaveCount(0);

    const legacyErrors = consoleErrors.filter((e) =>
      e.includes("reading 'wrapper'") ||
      e.includes('Telerik Web Report Designer plugin is not registered on jQuery')
    );
    expect(legacyErrors).toHaveLength(0);
  });

  test('report workspace page shows Report Server workspace or not-configured state', async ({ page, request }) => {
    await login(page, request);
    await page.goto('/app/report-designer');

    await expect(page.getByRole('heading', { name: 'Report Workspace' })).toBeVisible();

    const workspaceVisible = await page.locator('text=Report Server Workspace').first().isVisible().catch(() => false);
    const unavailableVisible = await page.locator('text=Report Server is not configured for this environment.').first().isVisible().catch(() => false);

    expect(workspaceVisible || unavailableVisible).toBeTruthy();
  });

  test('report pages expose no legacy embedded viewer copy', async ({ page, request }) => {
    await login(page, request);

    await page.goto('/app/reports');
    await expect(page.locator('text=Legacy Embedded Viewer')).toHaveCount(0);
    await expect(page.locator('text=Legacy embedded reporting')).toHaveCount(0);

    await page.goto('/app/report-designer');
    await expect(page.locator('text=Legacy compatibility mode')).toHaveCount(0);
    await expect(page.locator('text=Loading legacy report designer')).toHaveCount(0);
  });

  test('crm library exposes the six essential reports and their filter forms', async ({ page, request }) => {
    await login(page, request);
    await page.goto('/app/reports');

    const expectedReports = [
      'Pipeline by Stage',
      'Open Opportunities by Owner',
      'Pending Deal Approval',
      'Lead Conversion Summary',
      'Sales Activities by Owner',
      'Forecast Summary'
    ];

    for (const reportName of expectedReports) {
      await expect(page.locator('.catalog-card-title', { hasText: reportName })).toBeVisible();
    }

    await page.locator('.catalog-card', { hasText: 'Open Opportunities by Owner' }).click();
    await expect(page.getByRole('heading', { name: 'Filters' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Owner' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Stage' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Date range' })).toBeVisible();
    await page.getByRole('button', { name: 'Run Report' }).click();
    await expect(page.locator('tr-viewer')).toBeVisible();

    await page.getByRole('button', { name: 'Back to Catalog' }).click();
    await page.locator('.catalog-card', { hasText: 'Pending Deal Approval' }).click();
    await expect(page.locator('label', { hasText: 'Owner' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Approval status' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Requested date' })).toBeVisible();

    await page.getByRole('button', { name: 'Back to Catalog' }).click();
    await page.locator('.catalog-card', { hasText: 'Pipeline by Stage' }).click();
    await expect(page.locator('label', { hasText: 'Date range' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Owner' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Stage' })).toBeVisible();
  });
});
