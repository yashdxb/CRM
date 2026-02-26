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
  if (!resp.ok() || !payload?.accessToken) throw new Error(`Login failed ${resp.status()}`);
  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

test('verify lead company/email in UI', async ({ page, request }) => {
  page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE_ERROR', m.text()); });
  await login(page, request);
  await page.goto(`${BASE_URL}/app/leads/${LEAD_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.locator('form.lead-form').waitFor({ state: 'visible', timeout: 20000 });

  const company = await page.locator('input[name="companyName"]').inputValue();
  const email = await page.locator('input[name="email"]').inputValue();

  console.log('UI_COMPANY', company);
  console.log('UI_EMAIL', email);

  await page.screenshot({ path: 'output/playwright/lead-verify-values.png', fullPage: true });

  expect(company).toBe('Acme Industrial Services');
  expect(email).toBe('nora.patel@acme-industrial.com');
});
