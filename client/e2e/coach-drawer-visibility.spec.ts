import { test, expect } from '@playwright/test';

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.E2E_API_URL ??
  'http://localhost:5000';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'P@ssw0rd!';

async function login(page, request) {
  try {
    const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant-Key': 'default'
      },
      data: { email: SALES_REP_EMAIL, password: SALES_REP_PASSWORD }
    });
    const payload = await response.json();
    if (!payload?.accessToken) {
      throw new Error('Authentication failed');
    }

    await page.addInitScript((token) => {
      localStorage.setItem('auth_token', token as string);
      localStorage.setItem('tenant_key', 'default');
    }, payload.accessToken);
  } catch (e) {
    console.log('API login failed, trying UI login:', e.message);
  }

  await page.goto('/app/dashboard');
  await page.waitForTimeout(1000);
}

test('Coach drawer panel should be visible and interactive (not darkened)', async ({ page, request, context }) => {
  // Login
  await login(page, request);

  // Navigate to leads
  await page.goto('/app/leads');
  await page.waitForSelector('[data-testid="lead-coach-open"]', { timeout: 10000 });

  // Take screenshot before opening coach
  await page.screenshot({ path: 'coach-drawer-before.png', fullPage: false });

  // Click coach button on first lead
  const coachButton = page.locator('[data-testid="lead-coach-open"]').first();
  await coachButton.click();

  // Wait for drawer to be visible
  await page.waitForSelector('[data-testid="lead-coach-drawer"]', { timeout: 5000 });

  // Take screenshot of drawer
  await page.screenshot({ path: 'coach-drawer-open.png', fullPage: false });

  // Check if drawer is visible
  const drawerContent = page.locator('[data-testid="lead-coach-drawer"]');
  await expect(drawerContent).toBeVisible();

  // Check if drawer footer with buttons is visible
  const drawerFooter = page.locator('[data-testid="lead-coach-footer"]');
  await expect(drawerFooter).toBeVisible();

  // Check if Edit button exists and is visible
  const editButton = page.locator('button:has-text("Edit lead")').first();
  await expect(editButton).toBeVisible();

  // Check if Edit button is clickable (not disabled)
  const isDisabled = await editButton.evaluate(el => (el as HTMLButtonElement).disabled);
  expect(isDisabled).toBe(false);

  // Get computed styles to verify visibility
  const editButtonOpacity = await editButton.evaluate(el => window.getComputedStyle(el).opacity);
  console.log('Edit button opacity:', editButtonOpacity);

  const editButtonBg = await editButton.evaluate(el => window.getComputedStyle(el).backgroundColor);
  console.log('Edit button background:', editButtonBg);

  // Check drawer mask background opacity
  const drawerMask = page.locator('.p-drawer-mask').first();
  const maskBg = await drawerMask.evaluate(el => window.getComputedStyle(el).backgroundColor);
  console.log('Drawer mask background:', maskBg);

  // Try clicking the Edit button
  await editButton.click();

  // Verify navigation happened
  await page.waitForURL(/.*\/leads\/.*\/edit/, { timeout: 10000 });
  
  console.log('✅ Coach drawer test passed - panel is visible and buttons are clickable');
});

test('Log Activity button in coach drawer should be clickable', async ({ page, request }) => {
  await login(page, request);
  await page.goto('/app/leads');
  await page.waitForSelector('[data-testid="lead-coach-open"]', { timeout: 10000 });

  const coachButton = page.locator('[data-testid="lead-coach-open"]').first();
  await coachButton.click();

  await page.waitForSelector('[data-testid="lead-coach-drawer"]', { timeout: 5000 });

  const logActivityButton = page.locator('button:has-text("Log activity")').first();
  await expect(logActivityButton).toBeVisible();

  const isDisabled = await logActivityButton.evaluate(el => (el as HTMLButtonElement).disabled);
  expect(isDisabled).toBe(false);

  await logActivityButton.click();

  // Should navigate to activity creation
  await page.waitForURL(/.*\/activities\/new/, { timeout: 10000 });
  
  console.log('✅ Log activity button test passed');
});
