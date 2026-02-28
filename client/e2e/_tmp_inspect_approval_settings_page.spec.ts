import { test } from '@playwright/test';

test('inspect approval settings page', async ({ page }) => {
  const baseUrl = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
  await page.goto(`${baseUrl}/login`);
  const emailField = page.getByLabel(/email/i);
  if (await emailField.count()) {
    await emailField.fill('yasser.ahamed@live.com');
    await page.getByLabel(/^password$/i).fill('yAsh@123');
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await page.waitForURL(/\/app\//, { timeout: 20000 });
  }
  await page.goto(`${baseUrl}/app/settings/approvals`);
  await page.waitForTimeout(3000);
  console.log('URL', page.url());
  console.log('H1', await page.locator('h1').allTextContents().catch(() => []));
  console.log('H2', await page.locator('h2').allTextContents().catch(() => []));
  console.log('BUTTONS', await page.getByRole('button').allTextContents().catch(() => []));
  console.log('LABELS', await page.locator('label').allTextContents().catch(() => []));
  console.log('CHECKBOXES', await page.locator('input[type=\"checkbox\"]').count());
  console.log('BODY_HAS_ENABLE', await page.locator('body').textContent().then(t => !!t?.includes('Enable approval chain')).catch(() => false));
  console.log('BODY_SNIP', (await page.locator('body').textContent().catch(() => '')).slice(0,2400));
});
