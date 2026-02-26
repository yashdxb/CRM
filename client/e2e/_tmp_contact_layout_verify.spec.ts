import { test, expect } from '@playwright/test';

const API = 'http://127.0.0.1:5014';
const BASE = 'http://localhost:4201';
const LEAD_ID = '3b104395-182e-4836-8cce-ae2237928031';

async function login(page, request: any) {
  const r = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: 'yasser0503@outlook.com', password: 'yAsh@123' }
  });
  const p = await r.json();
  if (!r.ok() || !p?.accessToken) throw new Error(`login failed ${r.status()}`);
  await page.addInitScript((t) => {
    localStorage.setItem('auth_token', t as string);
    localStorage.setItem('tenant_key', 'default');
  }, p.accessToken);
}

test('contact details row order verification', async ({ page, request }) => {
  page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE_ERROR', m.text()); });
  await login(page, request);
  await page.goto(`${BASE}/app/leads/${LEAD_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.locator('form.lead-form').waitFor({ state: 'visible', timeout: 20000 });

  const contactPanel = page.getByRole('button', { name: /Contact details/i }).first();
  await contactPanel.scrollIntoViewIfNeeded();

  const emailInput = page.locator('input[name="email"]');
  const phoneType = page.locator('p-select[name="phoneTypeId"]');
  const phoneCountry = page.locator('p-select[name="phoneCountry"]');
  const phoneNumber = page.locator('input[name="phoneNumber"], input[name="phoneNumberPlain"]');

  await emailInput.waitFor({ state: 'visible' });
  await phoneType.first().waitFor({ state: 'visible' });
  await phoneCountry.first().waitFor({ state: 'visible' });
  await phoneNumber.first().waitFor({ state: 'visible' });

  const emailBox = await emailInput.boundingBox();
  const phoneTypeBox = await phoneType.first().boundingBox();
  const phoneCountryBox = await phoneCountry.first().boundingBox();
  const phoneNumberBox = await phoneNumber.first().boundingBox();

  console.log('EMAIL_BOX', JSON.stringify(emailBox));
  console.log('PHONE_TYPE_BOX', JSON.stringify(phoneTypeBox));
  console.log('PHONE_COUNTRY_BOX', JSON.stringify(phoneCountryBox));
  console.log('PHONE_NUMBER_BOX', JSON.stringify(phoneNumberBox));

  if (emailBox && phoneTypeBox) {
    console.log('ROW_ORDER_OK', emailBox.y < phoneTypeBox.y);
  }

  await page.screenshot({ path: 'output/playwright/lead-contact-layout-verify-after-revert.png', fullPage: true });

  expect(emailBox).not.toBeNull();
  expect(phoneTypeBox).not.toBeNull();
  expect(emailBox!.y).toBeLessThan(phoneTypeBox!.y);
});
