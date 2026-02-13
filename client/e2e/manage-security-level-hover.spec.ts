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

function isTooLight(color: string): boolean {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) {
    return false;
  }
  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);
  return r >= 245 && g >= 245 && b >= 245;
}

test('Manage Security Levels button text stays visible on hover', async ({ page, request }) => {
  await login(page, request);
  await page.goto('/app/settings/roles');
  await page.waitForLoadState('networkidle');
  await page.reload();
  await page.waitForLoadState('networkidle');

  const button = page.getByRole('button', { name: 'Manage Security Levels' });
  await expect(button).toBeVisible();

  const label = button.locator('span').filter({ hasText: 'Manage Security Levels' }).first();
  await expect(label).toBeVisible();

  const before = await label.evaluate((el) => {
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

  const after = await label.evaluate((el) => {
    const cs = getComputedStyle(el as HTMLElement);
    return {
      color: cs.color,
      opacity: cs.opacity,
      visibility: cs.visibility,
      display: cs.display,
      width: (el as HTMLElement).getBoundingClientRect().width
    };
  });

  expect(before.display).not.toBe('none');
  expect(before.visibility).toBe('visible');
  expect(Number(before.opacity)).toBeGreaterThan(0);
  expect(before.width).toBeGreaterThan(10);
  expect(isInvisibleColor(before.color)).toBeFalsy();

  expect(after.display).not.toBe('none');
  expect(after.visibility).toBe('visible');
  expect(Number(after.opacity)).toBeGreaterThan(0);
  expect(after.width).toBeGreaterThan(10);
  expect(isInvisibleColor(after.color)).toBeFalsy();
  expect(isTooLight(after.color)).toBeFalsy();

  await page.screenshot({ path: 'test-results/manage-security-level-hover-after-reload.png', fullPage: true });
});

test('Refresh button text stays visible on hover', async ({ page, request }) => {
  await login(page, request);
  await page.goto('/app/settings/roles');
  await page.waitForLoadState('networkidle');
  await page.reload();
  await page.waitForLoadState('networkidle');

  const button = page.getByRole('button', { name: 'Refresh' }).first();
  await expect(button).toBeVisible();

  const label = button.locator('span').filter({ hasText: 'Refresh' }).first();
  await expect(label).toBeVisible();

  const before = await label.evaluate((el) => {
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

  const after = await label.evaluate((el) => {
    const cs = getComputedStyle(el as HTMLElement);
    return {
      color: cs.color,
      opacity: cs.opacity,
      visibility: cs.visibility,
      display: cs.display,
      width: (el as HTMLElement).getBoundingClientRect().width
    };
  });

  expect(before.display).not.toBe('none');
  expect(before.visibility).toBe('visible');
  expect(Number(before.opacity)).toBeGreaterThan(0);
  expect(before.width).toBeGreaterThan(10);
  expect(isInvisibleColor(before.color)).toBeFalsy();

  expect(after.display).not.toBe('none');
  expect(after.visibility).toBe('visible');
  expect(Number(after.opacity)).toBeGreaterThan(0);
  expect(after.width).toBeGreaterThan(10);
  expect(isInvisibleColor(after.color)).toBeFalsy();
  expect(isTooLight(after.color)).toBeFalsy();

  await page.screenshot({ path: 'test-results/refresh-button-hover-after-reload.png', fullPage: true });
});

test('Role directory Add Role and Reload buttons keep text visible on hover', async ({ page, request }) => {
  await login(page, request);
  await page.goto('/app/settings/roles');
  await page.waitForLoadState('networkidle');
  await page.reload();
  await page.waitForLoadState('networkidle');

  const addRoleButton = page.getByRole('button', { name: 'Add Role' }).first();
  await expect(addRoleButton).toBeVisible();
  const addRoleLabel = addRoleButton.locator('span').filter({ hasText: 'Add Role' }).first();
  await expect(addRoleLabel).toBeVisible();
  const addRoleBefore = await addRoleLabel.evaluate((el) => getComputedStyle(el as HTMLElement).color);
  await addRoleButton.hover();
  const addRoleAfter = await addRoleLabel.evaluate((el) => getComputedStyle(el as HTMLElement).color);
  expect(isInvisibleColor(addRoleBefore)).toBeFalsy();
  expect(isInvisibleColor(addRoleAfter)).toBeFalsy();

  const reloadButton = page.getByRole('button', { name: 'Reload' }).first();
  await expect(reloadButton).toBeVisible();
  const reloadLabel = reloadButton.locator('span').filter({ hasText: 'Reload' }).first();
  await expect(reloadLabel).toBeVisible();
  const reloadBefore = await reloadLabel.evaluate((el) => getComputedStyle(el as HTMLElement).color);
  await reloadButton.hover();
  const reloadAfter = await reloadLabel.evaluate((el) => getComputedStyle(el as HTMLElement).color);
  expect(isInvisibleColor(reloadBefore)).toBeFalsy();
  expect(isInvisibleColor(reloadAfter)).toBeFalsy();
  expect(isTooLight(reloadAfter)).toBeFalsy();

  await page.screenshot({ path: 'test-results/roles-directory-action-buttons-hover.png', fullPage: true });
});
