import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';
const OPP_ID = 'e1a04d46-4f50-4ec8-88a9-2573228d58bc';

async function login(page: any, request: any) {
  const resp = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: EMAIL, password: PASSWORD }
  });
  const payload = await resp.json();
  if (!resp.ok() || !payload?.accessToken) throw new Error(`login failed ${resp.status()}`);
  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

test('opportunity edit renders accordion sections with badges', async ({ page, request }) => {
  await login(page, request);
  await page.goto(`${BASE_URL}/app/opportunities/${OPP_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.locator('form.form-layout').waitFor({ state: 'visible', timeout: 20000 });

  const accordion = page.locator('.opportunity-section-accordion');
  await expect(accordion).toBeVisible();

  const headers = page.locator('.opportunity-accordion-header');
  const count = await headers.count();
  console.log('ACCORDION_HEADER_COUNT=', count);
  expect(count).toBeGreaterThanOrEqual(8);

  const badges = page.locator('.opportunity-accordion-badge');
  console.log('BADGE_COUNT=', await badges.count());

  const headerTexts = await headers.evaluateAll(nodes => nodes.map(n => (n as HTMLElement).innerText.replace(/\s+/g,' ').trim()));
  console.log('HEADERS=', headerTexts);

  await page.screenshot({ path: 'output/playwright/opportunity-accordion-desktop.png', fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.locator('form.form-layout').waitFor({ state: 'visible', timeout: 20000 });

  const widths = await page.evaluate(() => ({ docW: document.documentElement.scrollWidth, bodyW: document.body.scrollWidth }));
  console.log('MOBILE_WIDTHS=', widths);
  expect(widths.docW).toBeLessThanOrEqual(392);

  await page.screenshot({ path: 'output/playwright/opportunity-accordion-mobile.png', fullPage: true });
});
