import { test, expect } from '@playwright/test';

test('topbar AI and bell use distinct color-wheel accents', async ({ page }) => {
  await page.goto('/login');
  await page.locator('input[type="email"]').fill('yasser.ahamed@live.com');
  await page.locator('input[type="password"]').fill('yAsh@123');
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.waitForURL(/\/app\//, { timeout: 30000 });
  await page.goto('/app/dashboard');
  await page.waitForLoadState('networkidle');

  const colors = await page.evaluate(() => {
    const ai = document.querySelector('.assistant-topbar');
    const bell = document.querySelector('app-notification-center .notification-center__button');
    const aiStyle = ai ? getComputedStyle(ai) : null;
    const bellStyle = bell ? getComputedStyle(bell) : null;
    return {
      aiBg: aiStyle?.backgroundImage ?? '',
      aiColor: aiStyle?.color ?? '',
      bellBg: bellStyle?.backgroundImage ?? '',
      bellColor: bellStyle?.color ?? '',
      bellBorder: bellStyle?.borderColor ?? '',
      aiText: ai?.textContent?.trim() ?? '',
    };
  });

  console.log('TOPBAR_ACCENTS', JSON.stringify(colors));
  expect(colors.aiText).toContain('AI Assistant');
  expect(colors.aiBg).toContain('45, 212, 191'); // teal/cyan accent
  expect(colors.bellBg).toContain('251, 191, 36'); // amber accent

  await page.screenshot({ path: 'output/playwright/topbar-ai-bell-colorwheel.png' });
});
