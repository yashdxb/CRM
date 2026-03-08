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

  await page.addInitScript((token) => {
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

    const hasReportServer = await page.locator('text=Report Library').first().isVisible().catch(() => false);
    const hasUnavailable = await page.locator('text=Report Server is not configured for this environment').first().isVisible().catch(() => false);

    expect(hasReportServer || hasUnavailable).toBeTruthy();

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
});
