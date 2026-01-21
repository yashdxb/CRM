import { test, expect } from '@playwright/test';

const email = process.env.CRM_EMAIL;
const password = process.env.CRM_PASSWORD;

test.describe('Dashboard card drag/drop', () => {
  test.skip(!email || !password, 'CRM_EMAIL/CRM_PASSWORD not set');

  test('reorders cards based on drop position', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/login`, { waitUntil: 'networkidle' });
    await page.fill('input[type="email"]', email!);
    await page.fill('input[type="password"]', password!);
    await page.getByRole('button', { name: /sign in/i }).click();

    await page.waitForURL('**/app/**', { timeout: 60_000 });
    await page.goto(`${baseURL}/app/dashboard`, { waitUntil: 'networkidle' });

    const cards = page.locator('.dashboard-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(1);

    const firstCard = cards.nth(0);
    const secondCard = cards.nth(1);
    const firstId = await firstCard.getAttribute('data-card-id');
    const secondId = await secondCard.getAttribute('data-card-id');

    expect(firstId).toBeTruthy();
    expect(secondId).toBeTruthy();

    await page.dragAndDrop(
      `[data-card-id="${firstId}"] .drag-handle`,
      `[data-card-id="${secondId}"]`
    );

    await page.waitForTimeout(800);

    const updatedFirst = await cards.nth(0).getAttribute('data-card-id');
    expect(updatedFirst).toBe(secondId);
  });
});
