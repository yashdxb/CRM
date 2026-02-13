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
    window.localStorage.setItem('auth_token', token as string);
    window.localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

test('roles directory view toggle switches list and hierarchy modes', async ({ page, request }) => {
  await login(page, request);

  await page.goto('/app/settings/roles');
  await page.waitForLoadState('networkidle');

  const toggle = page.getByTestId('roles-directory-view-toggle');
  const listButton = page.getByTestId('roles-view-list');
  const hierarchyButton = page.getByTestId('roles-view-hierarchy');

  await expect(toggle).toBeVisible();
  await expect(listButton).toHaveClass(/active/);
  await expect(listButton).toHaveAttribute('aria-pressed', 'true');
  await expect(hierarchyButton).toHaveText('Hierarchy');

  const hierarchyClipCheck = await hierarchyButton.evaluate((el) => {
    const node = el as HTMLElement;
    return {
      widthClipped: node.scrollWidth > node.clientWidth,
      heightClipped: node.scrollHeight > node.clientHeight
    };
  });
  expect(hierarchyClipCheck.widthClipped).toBeFalsy();
  expect(hierarchyClipCheck.heightClipped).toBeFalsy();

  await hierarchyButton.click();
  await expect(hierarchyButton).toHaveClass(/active/);
  await expect(hierarchyButton).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.orgchart-wrapper')).toBeVisible();

  await listButton.click();
  await expect(listButton).toHaveClass(/active/);
  await expect(page.getByRole('tabpanel', { name: /Directory/i }).locator('p-table').first()).toBeVisible();

  await page.screenshot({ path: 'test-results/roles-directory-toggle-ui.png', fullPage: true });
});
