import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'mobile', width: 390, height: 844 }
] as const;

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

async function assertNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    return document.documentElement.scrollWidth > width + 1;
  });
  expect(overflow).toBeFalsy();
}

test('marketing nav and pages are responsive and reachable', async ({ page, request }) => {
  await login(page, request);

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    await page.goto('/app/marketing/campaigns');
    await expect(page.getByRole('heading', { name: 'Campaign Management' })).toBeVisible();
    await assertNoHorizontalOverflow(page);

    await page.goto('/app/marketing/attribution');
    await expect(page.getByRole('heading', { name: 'Campaign Attribution' })).toBeVisible();
    await assertNoHorizontalOverflow(page);

    await page.goto('/app/settings/marketing');
    await expect(page.getByRole('heading', { name: /Marketing Settings/i })).toBeVisible();
    await assertNoHorizontalOverflow(page);

    await page.goto('/app/settings/marketing');
    await expect(page.getByRole('heading', { name: /Marketing Settings/i })).toBeVisible();
  }
});
