import { test, expect } from '@playwright/test';

const UI = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';
const LEAD_ID = '3b104395-182e-4836-8cce-ae2237928031';

async function apiLogin(page:any, request:any) {
  const r = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: EMAIL, password: PASSWORD }
  });
  expect(r.ok()).toBeTruthy();
  const body = await r.json();
  await page.addInitScript((token:string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('tenant_key', 'default');
  }, body.accessToken);
}

async function selectByLabel(page:any, rootSelector:string, text:string) {
  const root = page.locator(rootSelector).first();
  await root.click();
  const panel = page.locator('.p-select-overlay:visible, [role="listbox"]:visible').last();
  const option = panel.locator('.p-select-option, [role="option"]').filter({ hasText: new RegExp(`^${text}$`, 'i') }).first();
  await option.click();
}

test('qualify and convert existing lead', async ({ page, request }) => {
  page.on('console', m => {
    const t = m.text();
    if (m.type() === 'error' && !t.includes('403')) console.log('CONSOLE_ERROR', t);
  });

  await apiLogin(page, request);
  await page.goto(`${UI}/app/leads/${LEAD_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.locator('form.lead-form').waitFor({ state: 'visible', timeout: 20000 });
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove());

  // Set status to Qualified from Overview tab
  const overviewTab = page.getByRole('tab').filter({ hasText: /Overview/i }).first();
  try { await overviewTab.click({ timeout: 5000 }); } catch { await overviewTab.evaluate((el:any)=>el.click()); }

  await selectByLabel(page, 'p-select[name="status"]', 'Qualified');

  const [updateResp] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/leads/') && r.request().method() === 'PUT', { timeout: 20000 }),
    page.getByRole('button', { name: /Update lead/i }).first().click()
  ]);
  console.log('LEAD_UPDATE_STATUS', updateResp.status());
  if (!updateResp.ok()) console.log('LEAD_UPDATE_BODY', await updateResp.text());
  expect(updateResp.ok()).toBeTruthy();

  // Convert lead
  await page.getByRole('button', { name: /Convert lead/i }).first().click();
  await page.waitForURL(/\/app\/leads\/.*\/convert/);
  await page.locator('form.convert-form').waitFor({ state: 'visible', timeout: 15000 });

  // Fill realistic opportunity data if fields are empty/present
  const oppName = page.locator('input[name="opportunityName"], input[name="name"]').first();
  if (await oppName.count()) {
    const val = await oppName.inputValue().catch(() => '');
    if (!val?.trim()) await oppName.fill('Acme Industrial - Q2 Expansion');
  }
  const amount = page.locator('input[name="amount"], input[name="estimatedAmount"]').first();
  if (await amount.count()) {
    const val = await amount.inputValue().catch(() => '');
    if (!val?.trim()) await amount.fill('120000');
  }
  const summary = page.locator('textarea[name="summary"], textarea[name="description"]').first();
  if (await summary.count()) {
    const val = await summary.inputValue().catch(() => '');
    if (!val?.trim()) await summary.fill('Expansion rollout across two regions with approval and SLA controls.');
  }

  const [convertResp] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/convert') && r.request().method() === 'POST', { timeout: 20000 }),
    page.locator('form.convert-form button:has-text("Convert lead")').click()
  ]);
  console.log('CONVERT_STATUS', convertResp.status());
  const body = await convertResp.json().catch(async () => ({ raw: await convertResp.text() }));
  console.log('CONVERT_RESPONSE', JSON.stringify(body));
  expect(convertResp.ok()).toBeTruthy();

  await page.waitForURL(/\/app\/leads/);
  await page.screenshot({ path: 'client/output/playwright/lead-qualified-converted.png', fullPage: true });
});
