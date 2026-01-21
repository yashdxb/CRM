import { test, expect } from '@playwright/test';

const email = process.env.CRM_EMAIL;
const password = process.env.CRM_PASSWORD;

test.describe('Production lead creation', () => {
  test.skip(!email || !password, 'CRM_EMAIL/CRM_PASSWORD not set');

  test('create lead returns success', async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/login`, { waitUntil: 'networkidle' });
    await page.fill('input[type="email"]', email!);
    await page.fill('input[type="password"]', password!);
    await page.getByRole('button', { name: /sign in/i }).click();

    await page.waitForURL('**/app/**', { timeout: 60_000 });
    await page.goto(`${baseURL}/app/leads/new`, { waitUntil: 'networkidle' });

    const uniqueSuffix = Date.now().toString().slice(-6);
    await page.fill('input[name="firstName"]', `Prod${uniqueSuffix}`);
    await page.fill('input[name="lastName"]', 'Lead');

    const responsePromise = page.waitForResponse(
      (res) => res.url().includes('/api/leads') && res.request().method() === 'POST',
      { timeout: 30_000 }
    );

    await page.getByRole('button', { name: /create lead/i }).click();

    const response = await responsePromise;
    const status = response.status();
    if (status < 200 || status >= 300) {
      const body = await response.text();
      console.log('LEAD_CREATE_STATUS', status);
      console.log('LEAD_CREATE_HEADERS', JSON.stringify(response.headers(), null, 2));
      console.log('LEAD_CREATE_BODY', body.slice(0, 4000));
    }

    expect(status, 'Lead create response should be 2xx').toBeGreaterThanOrEqual(200);
    expect(status, 'Lead create response should be 2xx').toBeLessThan(300);
  });
});
