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

function isInvisibleColor(color: string): boolean {
  const normalized = color.replace(/\s+/g, '').toLowerCase();
  return normalized === 'transparent' || normalized === 'rgba(0,0,0,0)' || normalized.endsWith(',0)');
}

test('roles page: all visible button labels remain visible on hover', async ({ page, request }) => {
  await login(page, request);
  await page.goto('/app/settings/roles');
  await page.waitForLoadState('networkidle');
  await page.reload();
  await page.waitForLoadState('networkidle');

  const rolesRoot = page.locator('app-roles-page').first();
  await expect(rolesRoot).toBeVisible();

  const buttons = rolesRoot.locator('button.p-button');
  const count = await buttons.count();
  const issues: string[] = [];

  for (let i = 0; i < count; i += 1) {
    const button = buttons.nth(i);
    if (!(await button.isVisible())) {
      continue;
    }

    const buttonText = (await button.innerText()).trim().replace(/\s+/g, ' ');
    if (!buttonText || buttonText.length < 2) {
      continue;
    }

    const label = button.locator('.p-button-label, span').first();
    const hasVisibleLabel = (await label.count()) > 0 && (await label.isVisible());
    const target = hasVisibleLabel ? label : button;

    const before = await target.evaluate((el) => {
      const cs = getComputedStyle(el as HTMLElement);
      return {
        color: cs.color,
        opacity: cs.opacity,
        visibility: cs.visibility,
        display: cs.display,
        width: (el as HTMLElement).getBoundingClientRect().width
      };
    });

    await button.hover();

    const after = await target.evaluate((el) => {
      const cs = getComputedStyle(el as HTMLElement);
      return {
        color: cs.color,
        opacity: cs.opacity,
        visibility: cs.visibility,
        display: cs.display,
        width: (el as HTMLElement).getBoundingClientRect().width
      };
    });

    const invalidBefore =
      before.display === 'none' ||
      before.visibility !== 'visible' ||
      Number(before.opacity) <= 0 ||
      before.width <= 4 ||
      isInvisibleColor(before.color);
    const invalidAfter =
      after.display === 'none' ||
      after.visibility !== 'visible' ||
      Number(after.opacity) <= 0 ||
      after.width <= 4 ||
      isInvisibleColor(after.color);

    if (invalidBefore || invalidAfter) {
      issues.push(
        `Visibility issue: "${buttonText}" | before=${JSON.stringify(before)} | after=${JSON.stringify(after)}`
      );
    }
  }

  await page.screenshot({ path: 'test-results/roles-all-buttons-hover.png', fullPage: true });
  expect(issues, issues.join('\n')).toEqual([]);
});
