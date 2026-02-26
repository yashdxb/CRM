import { test, expect } from '@playwright/test';

const EMAIL = 'yasser0503@outlook.com';
const PASSWORD = 'yAsh@123';

async function login(page) {
  await page.goto('/login');
  await page.evaluate(() => localStorage.setItem('tenant_key', 'default'));
  await page.locator('input[placeholder="Enter your email"]').fill(EMAIL);
  await page.locator('input[placeholder="Enter your password"]').fill(PASSWORD);
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.waitForURL(/\/app\//, { timeout: 20000 });
}

for (const viewport of [
  { name: 'desktop', width: 1600, height: 900 },
  { name: 'tablet', width: 834, height: 1194 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`full-width responsive audit - ${viewport.name}`, async ({ page, context }) => {
    await context.clearCookies();
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await login(page);

    const routes = ['/app/dashboard', '/app/leads', '/app/activities', '/app/settings/qualification-policy'];
    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      const dims = await page.evaluate(() => ({
        docW: document.documentElement.scrollWidth,
        bodyW: document.body.scrollWidth,
        vw: window.innerWidth,
      }));
      expect(dims.docW, `${route} doc overflow`).toBeLessThanOrEqual(dims.vw + 1);
      expect(dims.bodyW, `${route} body overflow`).toBeLessThanOrEqual(dims.vw + 1);
    }

    await page.goto('/app/settings/qualification-policy');
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.screenshot({ path: `output/playwright/fullwidth-${viewport.name}-qualification-policy.png`, fullPage: true });
  });
}
