import { expect, test } from '@playwright/test';

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

test('dashboard shows separate Risk Intelligence card and standalone AI Execution Orchestration card', async ({ page, request }) => {
  await login(page, request);

  await page.goto('/app/dashboard', { waitUntil: 'networkidle' });

  const riskCard = page.locator('article.dashboard-card[data-card-id="risk-register"]').first();
  await expect(riskCard).toBeVisible();
  await expect(riskCard).toContainText('Top CRM risks ranked by urgency');

  const aiCard = page.locator('article.dashboard-card[data-card-id="ai-orchestration"]').first();
  await expect(aiCard).toBeVisible();
  await expect(aiCard).toContainText('separate from Risk Intelligence guidance');
  await expect(aiCard).not.toContainText('Execution diagnostics behind the queue');

  await riskCard.getByRole('button', { name: /Open workspace/i }).first().click();
  await expect(page).toHaveURL(/\/app\/risk-intelligence/);
});
