import { test, expect } from '@playwright/test';

test('enable minimal approval workflow as admin', async ({ page }) => {
  const baseUrl = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
  await page.goto(`${baseUrl}/login`);
  const emailField = page.getByLabel(/email/i);
  if (await emailField.count()) {
    await emailField.fill('yasser.ahamed@live.com');
    await page.getByLabel(/^password$/i).fill('yAsh@123');
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await page.waitForURL(/\/app\//, { timeout: 20000 });
  }

  await page.goto(`${baseUrl}/app/settings/approvals`);
  await page.waitForLoadState('networkidle');

  // Enable approval chain if not enabled.
  const enableCheckbox = page.locator('.checkbox-field', { hasText: /Enable approval chain/i }).locator('input[type="checkbox"]');
  if (!(await enableCheckbox.isChecked())) {
    await enableCheckbox.click({ force: true });
    await page.waitForTimeout(300);
  }

  // Ensure at least one step exists.
  const steps = page.locator('.approval-step');
  if ((await steps.count()) === 0) {
    await page.getByRole('button', { name: /Add Step/i }).click();
    await expect(steps.first()).toBeVisible();
  }

  // Set first step approver role to Sales Manager.
  const firstStep = steps.first();
  const roleSelect = firstStep.locator('p-select').first();
  await roleSelect.click({ force: true });
  const overlay = page.locator('.p-select-overlay:visible, .p-dropdown-panel:visible').last();
  await overlay.getByText(/Sales Manager/i).click({ force: true });

  // Leave purpose empty and threshold empty to allow all purposes.
  // Save.
  const saveResp = page.waitForResponse((r) => r.url().includes('/api/workspace') && r.request().method() === 'PUT');
  await page.getByRole('button', { name: /Save Approval Settings/i }).click();
  const resp = await saveResp;
  console.log('WORKSPACE_SAVE_STATUS', resp.status());
  const body = await resp.text();
  console.log('WORKSPACE_SAVE_BODY', body.slice(0, 500));
  expect(resp.ok()).toBeTruthy();
});
