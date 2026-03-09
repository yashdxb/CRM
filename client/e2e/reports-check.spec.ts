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

test('reports page shows report library', async ({ page, request }) => {
  // Capture all API calls
  const apiCalls: { url: string; status: number; body?: string }[] = [];
  page.on('response', async (response) => {
    if (response.url().includes('/api/')) {
      let body = '';
      try { body = await response.text(); } catch {}
      apiCalls.push({ url: response.url(), status: response.status(), body: body.substring(0, 500) });
    }
  });

  page.on('console', (msg) => {
    console.log(`[browser ${msg.type()}]`, msg.text());
  });

  await login(page, request);
  await page.goto('/app/reports', { waitUntil: 'networkidle' });

  // Wait for the page to settle
  await page.waitForTimeout(3000);

  // Log all API calls made
  console.log('\n=== API CALLS ===');
  for (const call of apiCalls) {
    console.log(`  ${call.status} ${call.url}`);
    if (call.url.includes('report-server')) {
      console.log(`    Body: ${call.body}`);
    }
  }

  // Check page content
  const pageText = await page.textContent('body');
  console.log('\n=== PAGE TEXT (report-related) ===');
  const lines = (pageText || '').split('\n').filter(l => /report|library|catalog|unavailable|configured/i.test(l));
  for (const line of lines) {
    console.log(`  ${line.trim().substring(0, 200)}`);
  }

  // Take a screenshot
  await page.screenshot({ path: 'client/e2e/reports-check.png', fullPage: true });

  // Check for the catalog grid or cards
  const catalogCards = page.locator('.catalog-card');
  const cardCount = await catalogCards.count();
  console.log(`\n=== REPORT CARDS FOUND: ${cardCount} ===`);

  // Check if "Report Server is not configured" message is visible
  const unavailable = page.locator('.unavailable-card');
  const unavailableVisible = await unavailable.isVisible().catch(() => false);
  console.log(`=== "Report Server unavailable" visible: ${unavailableVisible} ===`);

  // Check if the report library section is visible
  const catalogSection = page.locator('.catalog-section');
  const catalogVisible = await catalogSection.isVisible().catch(() => false);
  console.log(`=== Catalog section visible: ${catalogVisible} ===`);

  // Check for loading state
  const loadingState = page.locator('.loading-state');
  const loadingVisible = await loadingState.isVisible().catch(() => false);
  console.log(`=== Loading state visible: ${loadingVisible} ===`);

  // Check for empty state
  const emptyState = page.locator('.catalog-section .empty-state');
  const emptyVisible = await emptyState.isVisible().catch(() => false);
  console.log(`=== Empty state visible: ${emptyVisible} ===`);

  // Assert we see report cards
  expect(cardCount, 'Expected report cards to appear in the catalog').toBeGreaterThan(0);
});
