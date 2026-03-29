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
    const reportCount = await page.locator('.catalog-card').count();
    expect(reportCount).toBeGreaterThanOrEqual(6);
    await expect(page.locator('text=Report Server is not configured for this environment')).toHaveCount(0);

    const legacyErrors = consoleErrors.filter((e) =>
      e.includes("reading 'wrapper'") ||
      e.includes('Telerik Web Report Designer plugin is not registered on jQuery')
    );
    expect(legacyErrors).toHaveLength(0);
  });

  test('report workspace page shows embedded designer or report server workspace depending on configuration', async ({ page, request }) => {
    await login(page, request);
    await page.goto('/app/report-designer');

    await expect(page.getByRole('heading', { name: 'Report Workspace' })).toBeVisible();
    await expect(page.locator('.designer-section, .report-server-shell, .error-state').first()).toBeVisible();
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

  test('crm library exposes the essential reports and runs embedded report previews', async ({ page, request }) => {
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

    const reportsToRun = [
      {
        name: 'Open Opportunities by Owner',
        filters: ['Owner', 'Stage', 'Date range']
      },
      {
        name: 'Pending Deal Approval',
        filters: ['Owner', 'Approval status', 'Requested date']
      },
      {
        name: 'Pipeline by Stage',
        filters: ['Date range', 'Owner', 'Stage']
      }
    ];

    for (const report of reportsToRun) {
      await page.locator('.catalog-card', { hasText: report.name }).click();
      await expect(page.getByRole('heading', { name: 'Filters' })).toBeVisible();
      for (const filter of report.filters) {
        await expect(page.locator('label', { hasText: filter })).toBeVisible();
      }

      await expect(page.getByRole('button', { name: 'Run Report' })).toBeVisible();
      await page.getByRole('button', { name: 'Run Report' }).click();
      await expect(page.locator('tr-viewer')).toBeVisible();
      await expect(page.locator('.trv-error-pane:visible')).toHaveCount(0);

      await page.getByRole('button', { name: 'Back to Catalog' }).click();
    }
  });
});
