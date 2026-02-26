import { test } from '@playwright/test';

test('lead page ancestor width chain', async ({ page }) => {
  await page.goto('http://127.0.0.1:4204/login');
  await page.fill('input[name="email"]', 'yasser0503@outlook.com');
  await page.fill('input[name="password"]', 'P@ssword123!');
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.waitForURL('**/app/**');
  await page.goto('http://127.0.0.1:4204/app/leads/3b104395-182e-4836-8cce-ae2237928031/edit');
  await page.waitForSelector('.lead-form-page');

  const chain = await page.evaluate(() => {
    const el = document.querySelector('.lead-form-page') as HTMLElement | null;
    const out: any[] = [];
    let cur: HTMLElement | null = el;
    let depth = 0;
    while (cur && depth < 8) {
      const cs = getComputedStyle(cur);
      const r = cur.getBoundingClientRect();
      out.push({
        tag: cur.tagName,
        cls: cur.className,
        width: Math.round(r.width),
        display: cs.display,
        alignSelf: cs.alignSelf,
        justifySelf: (cs as any).justifySelf,
        marginLeft: cs.marginLeft,
        marginRight: cs.marginRight,
        maxWidth: cs.maxWidth,
      });
      cur = cur.parentElement;
      depth++;
    }
    return {
      viewport: { w: window.innerWidth },
      chain
    };
  });
  console.log(JSON.stringify(chain, null, 2));
});
