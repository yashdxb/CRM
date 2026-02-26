import { test, expect } from '@playwright/test';

test('topbar height increased ~20 percent and stays fixed', async ({ page }) => {
  await page.goto('/login');
  await page.locator('input[type="email"]').fill('yasser.ahamed@live.com');
  await page.locator('input[type="password"]').fill('yAsh@123');
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.waitForURL(/\/app\//, { timeout: 30000 });
  await page.goto('/app/dashboard');
  await page.waitForLoadState('networkidle');

  const info = await page.evaluate(() => {
    const top = document.querySelector('.topbar') as HTMLElement | null;
    if (!top) return null;
    const cs = getComputedStyle(top);
    const r = top.getBoundingClientRect();
    return {
      height: Math.round(r.height),
      position: cs.position,
      top: cs.top,
      paddingTop: cs.paddingTop,
      paddingBottom: cs.paddingBottom,
    };
  });
  console.log('TOPBAR_HEIGHT_INFO', JSON.stringify(info));
  expect(info).not.toBeNull();
  expect(info!.position).toBe('fixed');
  expect(info!.height).toBeGreaterThanOrEqual(46);
  expect(info!.height).toBeLessThanOrEqual(50);
  await page.screenshot({ path: 'output/playwright/topbar-height-20pct.png' });
});
