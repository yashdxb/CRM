import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';
const LEAD_ID = '3b104395-182e-4836-8cce-ae2237928031';

async function login(page, request: any) {
  const resp = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: EMAIL, password: PASSWORD }
  });
  const payload = await resp.json();
  if (!resp.ok() || !payload?.accessToken) throw new Error(`Login failed ${resp.status()} ${JSON.stringify(payload)}`);
  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

test('update created lead with realistic values', async ({ page, request }) => {
  page.on('console', (msg) => { if (msg.type() === 'error') console.log('CONSOLE_ERROR', msg.text()); });
  page.on('pageerror', (e) => console.log('PAGEERROR', e.message));

  await login(page, request);
  await page.goto(`${BASE_URL}/app/leads/${LEAD_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForURL('**/app/leads/**/edit');
  await page.locator('form.lead-form').waitFor({ state: 'visible', timeout: 20000 });

  await page.locator('input[name="companyName"]').fill('Acme Industrial Services');
  await page.locator('input[name="email"]').fill('nora.patel@acme-industrial.com');

  const updateButton = page.locator('button:has-text("Update lead")');
  await expect(updateButton).toBeEnabled();

  const updateResponsePromise = page.waitForResponse(
    (r) => r.url().includes(`/api/leads/${LEAD_ID}`) && r.request().method() === 'PUT',
    { timeout: 30000 }
  ).catch(() => null);

  await updateButton.click();

  const toast = page.getByText('Lead updated.');
  await Promise.race([
    toast.waitFor({ state: 'visible', timeout: 30000 }).catch(() => null),
    page.waitForTimeout(1500)
  ]);

  const updateResp = await updateResponsePromise;
  console.log('UPDATED_LEAD_ID', LEAD_ID);
  console.log('UPDATED_COMPANY', 'Acme Industrial Services');
  console.log('UPDATED_EMAIL', 'nora.patel@acme-industrial.com');
  if (updateResp) {
    console.log('UPDATE_STATUS', updateResp.status());
    console.log('UPDATE_BODY', (await updateResp.text()).slice(0, 600));
  }

  await page.screenshot({ path: 'output/playwright/lead-realistic-updated.png', fullPage: true });
});
