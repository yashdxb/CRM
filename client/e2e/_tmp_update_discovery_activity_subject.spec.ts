import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const LEO_EMAIL = 'yasser0503@outlook.com';
const PASSWORD = process.env.E2E_LEO_PASSWORD ?? 'yAsh@123';
const ACTIVITY_ID = 'db7a8c06-dcef-4f50-a5f2-4d27b92f1eea';
const CLEAN_SUBJECT = 'Discovery meeting - Acme expansion';

async function apiLogin(page: any, request: any) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: LEO_EMAIL, password: PASSWORD }
  });
  expect(response.ok()).toBeTruthy();
  const payload = await response.json();
  await page.addInitScript((token: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken as string);
}

test('clean discovery activity subject to realistic value', async ({ page, request, baseURL }) => {
  test.setTimeout(60000);
  const apiFailures: Array<{ url: string; status: number }> = [];
  page.on('response', (resp) => {
    if (resp.url().includes('/api/') && resp.status() >= 400) {
      apiFailures.push({ url: resp.url(), status: resp.status() });
    }
  });

  await apiLogin(page, request);
  const uiBase = baseURL ?? 'http://localhost:4201';

  await page.goto(`${uiBase}/app/activities/${ACTIVITY_ID}/edit`);
  await page.waitForURL(`**/app/activities/${ACTIVITY_ID}/edit`);

  const subjectInput = page.locator('input[name="subject"]');
  await subjectInput.waitFor({ state: 'visible' });
  await subjectInput.fill(CLEAN_SUBJECT);

  const [updateResp] = await Promise.all([
    page.waitForResponse(r => r.url().includes(`/api/activities/${ACTIVITY_ID}`) && (r.request().method() === 'PUT' || r.request().method() === 'PATCH')),
    page.getByRole('button', { name: 'Update activity' }).click()
  ]);

  console.log('UPDATE_STATUS=', updateResp.status());
  console.log('API_FAILURES=', JSON.stringify(apiFailures.slice(0, 20)));
  expect(updateResp.ok()).toBeTruthy();

  await expect(subjectInput).toHaveValue(CLEAN_SUBJECT);
  await page.screenshot({ path: 'client/output/playwright/discovery-activity-subject-cleaned.png', fullPage: true });
});
