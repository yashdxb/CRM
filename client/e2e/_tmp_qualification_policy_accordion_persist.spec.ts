import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function loginToken(request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  const payload = await response.json();
  if (!payload?.accessToken) throw new Error('Auth failed');
  return payload.accessToken as string;
}

test('qualification policy accordion state loads from server', async ({ page, request }) => {
  const token = await loginToken(request);

  const desired = ['thresholds', 'factor-evidence'];
  const put = await request.put(`${API_BASE_URL}/api/users/me/ui-state/qualification-policy-accordion`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    },
    data: { value: desired }
  });
  expect(put.ok()).toBeTruthy();

  await page.addInitScript((authToken) => {
    localStorage.setItem('auth_token', authToken);
    localStorage.setItem('tenant_key', 'default');
  }, token);

  await page.goto('/app/settings/qualification-policy', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1.hero-title')).toBeVisible();

  const thresholds = page.getByRole('button', { name: /Thresholds & Guardrails/i }).first();
  const factorEvidence = page.getByRole('button', { name: /Factor Evidence Mapping/i }).first();
  const modifiers = page.getByRole('button', { name: /Modifiers/i }).first();
  const evidenceSources = page.getByRole('button', { name: /Evidence Sources/i }).first();

  await expect(thresholds).toHaveAttribute('aria-expanded', 'true');
  await expect(factorEvidence).toHaveAttribute('aria-expanded', 'true');
  await expect(modifiers).toHaveAttribute('aria-expanded', 'false');
  await expect(evidenceSources).toHaveAttribute('aria-expanded', 'false');

  await page.screenshot({ path: 'output/playwright/qualification-policy-accordion-server-persist.png', fullPage: true });
});
