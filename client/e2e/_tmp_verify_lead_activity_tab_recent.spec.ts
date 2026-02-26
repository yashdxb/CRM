import { test, expect } from '@playwright/test';
const API_BASE_URL = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
async function login(page: any, request: any) {
  const resp = await request.post(`${API_BASE_URL}/api/auth/login`, { headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' }, data: { email: 'yasser0503@outlook.com', password: 'yAsh@123' } });
  const payload = await resp.json();
  await page.addInitScript((t: string) => { localStorage.setItem('auth_token', t); localStorage.setItem('tenant_key', 'default'); }, payload.accessToken as string);
}

test('lead activity tab shows recent lead activities', async ({ page, request, baseURL }) => {
  await login(page, request);
  await page.goto(`${baseURL ?? 'http://localhost:4201'}/app/leads/3b104395-182e-4836-8cce-ae2237928031/edit`);
  await page.waitForURL('**/app/leads/**/edit');
  await page.getByRole('tab', { name: /Activity/i }).click();
  await expect(page.getByText('Recent Lead Activities')).toBeVisible();
  await expect(page.getByText('Discovery meeting - Acme expansion')).toBeVisible();
  await page.screenshot({ path: 'client/output/playwright/lead-activity-tab-recent-list.png', fullPage: true });
});
