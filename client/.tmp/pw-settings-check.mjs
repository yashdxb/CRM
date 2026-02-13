import { chromium, request as pwRequest } from '@playwright/test';

const baseURL = 'http://localhost:4201';
const apiBase = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const adminEmail = 'yasser.ahamed@live.com';
const adminPassword = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

const req = await pwRequest.newContext();
const loginResp = await req.post(`${apiBase}/api/auth/login`, {
  headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
  data: { email: adminEmail, password: adminPassword }
});
const payload = await loginResp.json();
if (!payload?.accessToken) throw new Error('Unable to login for playwright check');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ baseURL });
const errors = [];
page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
page.on('console', msg => { if (msg.type() === 'error') errors.push(`console: ${msg.text()}`); });

await page.addInitScript((token) => {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('tenant_key', 'default');
}, payload.accessToken);

await page.goto('/app/settings');
await page.waitForLoadState('networkidle');

const tabs = page.locator('.people-tabs .p-tab');
console.log('tab_count=', await tabs.count());
for (const name of ['Roles', 'Teams', 'Users']) {
  await page.getByRole('tab', { name }).click();
  await page.waitForTimeout(300);
}

await page.screenshot({ path: 'test-results/settings-tabs-check.png', fullPage: true });
console.log(errors.length ? errors.join('\n') : 'NO_PAGE_ERRORS');

await browser.close();
await req.dispose();
