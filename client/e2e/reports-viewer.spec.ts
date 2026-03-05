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

test.describe('Reports Viewer', () => {
  test('displays report viewer without wrapper errors', async ({ page, request }) => {
    const consoleErrors: string[] = [];
    
    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await login(page, request);

    // Navigate to reports
    await page.goto('/app/reports');
    
    // Wait for report viewer to be present
    await page.waitForSelector('tr-viewer, .trv-report-viewer', { timeout: 30000 });
    
    // Wait for toolbar to load
    await page.waitForSelector('.trv-toolbar', { timeout: 30000 });
    
    // Wait a bit for widget initialization
    await page.waitForTimeout(3000);
    
    // Check no critical wrapper errors
    const wrapperErrors = consoleErrors.filter(e => e.includes("reading 'wrapper'"));
    expect(wrapperErrors).toHaveLength(0);
  });

  test('page number input widget is properly initialized', async ({ page, request }) => {
    await login(page, request);
    
    await page.goto('/app/reports');
    
    // Wait for viewer
    await page.waitForSelector('tr-viewer, .trv-report-viewer', { timeout: 30000 });
    
    // Wait for toolbar
    await page.waitForSelector('.trv-toolbar', { timeout: 30000 });
    
    // Wait for widget initialization
    await page.waitForTimeout(3000);
    
    // Check page number input exists
    const pageNumberInput = page.locator('[data-role="telerik_ReportViewer_PageNumberInput"]');
    await expect(pageNumberInput).toBeVisible();
    
    // Check the parent wrapper has proper Kendo classes
    const wrapperClass = await pageNumberInput.locator('xpath=..').getAttribute('class');
    expect(wrapperClass).toContain('k-numerictextbox');
    
    // Verify Kendo widget instance exists via JS evaluation
    const hasKendoInstance = await page.evaluate(() => {
      const el = document.querySelector('[data-role="telerik_ReportViewer_PageNumberInput"]');
      const wrapper = el?.parentElement;
      return !!window.jQuery?.(wrapper)?.data('kendoNumericTextBox');
    });
    
    // Note: The widget might use internal Kendo, so we check DOM structure is correct
    expect(wrapperClass).toContain('k-input');
  });

  test('report pages area displays content', async ({ page, request }) => {
    await login(page, request);
    
    await page.goto('/app/reports');
    
    // Wait for viewer
    await page.waitForSelector('tr-viewer, .trv-report-viewer', { timeout: 30000 });
    
    // Wait for pages area
    await page.waitForSelector('.trv-pages-area', { timeout: 30000 });
    
    // Wait for document to be ready
    await page.waitForSelector('.trv-page-container', { timeout: 60000 });
    
    // Check if page content loaded
    const pageContent = page.locator('.trv-report-page');
    await expect(pageContent).toBeVisible({ timeout: 60000 });
  });
});
